import { Module } from '@nestjs/common';

import { UserController } from './controllers/user/user.controller';
import { DocumentController } from './controllers/document/document.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { documentTcpProvider, userTcpProvider } from './tcp-client-providers';

@Module({
  imports: [
    ClientsModule.register([
      { name: 'USER_SERVICE', transport: Transport.TCP },
      { name: 'DOCUMENT_SERVICE', transport: Transport.TCP },
  ]),],
  controllers: [UserController, DocumentController],
  providers: [
    userTcpProvider,
    documentTcpProvider,
  ],
})
export class AppModule {}
