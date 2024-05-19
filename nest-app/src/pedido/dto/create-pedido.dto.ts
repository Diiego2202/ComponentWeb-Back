import { IsString, IsArray, ArrayMinSize, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class CreatePedidoDto {
  @IsString()
  nome: string;

  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => ProdutoItemDto)
  produtos: ProdutoItemDto[];
}

export class ProdutoItemDto {
  @IsString()
  produtoId: number;

  @IsString()
  quantidade: number;
}