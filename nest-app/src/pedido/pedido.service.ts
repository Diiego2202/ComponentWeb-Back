import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Pedido } from '@prisma/client';
import { CreatePedidoDto } from './dto/create-pedido.dto';

@Injectable()
export class PedidoService {
  constructor(private prisma: PrismaService) {}

  async findOne(id: number): Promise<Pedido> {
    const pedido = await this.prisma.pedido.findUnique({ where: { id } });
    if (!pedido) {
      throw new NotFoundException(`Pedido com ID ${id} não encontrado`);
    }
    return pedido;
  }

  async findAll(): Promise<Pedido[]> {
    return this.prisma.pedido.findMany();
  }

  async create(createPedidoDto: CreatePedidoDto): Promise<Pedido> {
    let valorTotal = 0;

    for (const item of createPedidoDto.produtos) {
      const produto = await this.prisma.produto.findUnique({ where: { id: item.produtoId } });
      if (!produto) {
        throw new NotFoundException(`Produto com ID ${item.produtoId} não encontrado`);
      }
      if (produto.estoque < item.quantidade) {
        throw new BadRequestException(`Estoque insuficiente para o produto com ID ${item.produtoId}`);
      }

      valorTotal += produto.valor * item.quantidade;

      await this.prisma.produto.update({
        where: { id: item.produtoId },
        data: { estoque: produto.estoque - item.quantidade },
      });
    }

    const novoPedido = await this.prisma.pedido.create({
      data: {
        valor: valorTotal,
        produtos: {
          create: createPedidoDto.produtos.map(item => ({
            quantidade: item.quantidade,
            produto: { connect: { id: item.produtoId } }
          }))
        }
      }
    });

    return novoPedido;
  }

  async delete(id: number): Promise<void> {
    const pedido = await this.prisma.pedido.findUnique({ where: { id } });
    if (!pedido) {
      throw new NotFoundException(`Pedido com ID ${id} não encontrado`);
    }
    await this.prisma.pedido.delete({ where: { id } });
  }
}
