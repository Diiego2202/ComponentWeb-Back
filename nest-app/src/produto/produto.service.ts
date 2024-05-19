import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Produto, Prisma } from '@prisma/client';
import { CreateProdutoDto } from './dto/create-produto.dto';
import { UpdateProdutoDto } from './dto/update-produto.dto';

@Injectable()
export class ProdutoService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateProdutoDto): Promise<Produto> {
    return this.prisma.produto.create({ data });
  }

  async update(id: number, data: UpdateProdutoDto): Promise<Produto> {
    const produto = await this.prisma.produto.findUnique({ where: { id } });
    if (!produto) {
      throw new NotFoundException(`Produto with ID ${id} not found`);
    }
    return this.prisma.produto.update({
      where: { id },
      data,
    });
  }

  async delete(id: number): Promise<Produto> {
    const produto = await this.prisma.produto.findUnique({ where: { id } });
    if (!produto) {
      throw new NotFoundException(`Produto with ID ${id} not found`);
    }
    return this.prisma.produto.delete({
      where: { id },
    });
  }
}