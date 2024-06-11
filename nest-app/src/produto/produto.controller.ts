import { Controller, Get, Post, Put, Delete, Param, Body, ParseIntPipe } from '@nestjs/common';
import { ProdutoService } from './produto.service';
import { Produto } from '@prisma/client';
import { CreateProdutoDto } from './dto/create-produto.dto';
import { UpdateProdutoDto } from './dto/update-produto.dto';

@Controller('produto')
export class ProdutoController {
  constructor(private readonly produtoService: ProdutoService) {}

  @Get()
  async findAll(): Promise<Produto[]> {
    return this.produtoService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Produto> {
    return this.produtoService.findOne(id);
  }

  @Post()
  async create(@Body() createProdutoDto: CreateProdutoDto): Promise<Produto> {
    return this.produtoService.create(createProdutoDto);
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProdutoDto: UpdateProdutoDto,
  ): Promise<Produto> {
    return this.produtoService.update(id, updateProdutoDto);
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.produtoService.delete(id);
  }
}
