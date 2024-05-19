import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProdutoModule } from './produto/produto.module';
import { PedidoModule } from './pedido/pedido.module';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [ProdutoModule, PedidoModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
