import { Controller, Get, Post, Delete, Param, Body, ParseIntPipe } from '@nestjs/common';
import { PedidoService } from './pedido.service';
import { Pedido } from '@prisma/client';
import { CreatePedidoDto } from './dto/create-pedido.dto';

@Controller('pedido')
export class PedidoController {
  constructor(private readonly pedidoService: PedidoService) {}

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Pedido> {
    return this.pedidoService.findOne(id);
  }

  @Get()
  async findAll(): Promise<Pedido[]> {
    return this.pedidoService.findAll();
  }

  @Post()
  async create(@Body() createPedidoDto: CreatePedidoDto): Promise<Pedido> {
    return this.pedidoService.create(createPedidoDto);
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.pedidoService.delete(id);
  }
}