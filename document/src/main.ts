import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

import { DocumentModule } from './document.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    DocumentModule,
    {
      transport: Transport.TCP,
    },
  );
  await app.listen();
}
bootstrap();
