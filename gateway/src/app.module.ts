import { Module } from '@nestjs/common';

import { UserController } from './controllers/user/user.controller';
import { DocumentController } from './controllers/document/document.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { documentTcpProvider, userTcpProvider } from './tcp-client-providers';

@Module({
  imports: [
    ClientsModule.register([
      { name: userTcpProvider.provide, transport: Transport.TCP },
      { name: documentTcpProvider.provide, transport: Transport.TCP },
  ]),],
  controllers: [UserController, DocumentController],
  providers: [
    userTcpProvider,
    documentTcpProvider,
  ],
})
export class AppModule {}
