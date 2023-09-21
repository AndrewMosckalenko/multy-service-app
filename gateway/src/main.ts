import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';

const PORT = process.env.BACKEND_GATEWAY_PORT || 5000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('Multiservice app')
    .setDescription('The API of multiservice app')
    .setVersion('1.0')
    .addTag('')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-config', app, document);

  await app.listen(PORT, () => {
    console.log(`GATEWAY service started on http://localhost:${PORT}`);
  });
}
bootstrap();
