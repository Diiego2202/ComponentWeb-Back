import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PrismaClient } from '@prisma/client';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: 'http://localhost:3001',
  });

  const prisma = new PrismaClient();
    const produtos = [
      { nome: 'Produto 1', tamanho: 'M', valor: 19.99, estoque: 100 },
      { nome: 'Produto 2', tamanho: 'L', valor: 29.99, estoque: 200 },
      { nome: 'Produto 3', tamanho: 'S', valor: 9.99, estoque: 300 },
    ];
  
    for (const produto of produtos) {
      await prisma.produto.create({
        data: produto,
      });
    }

  await app.listen(3000);
}
bootstrap();