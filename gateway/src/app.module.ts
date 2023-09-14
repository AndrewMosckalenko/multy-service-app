import { Module } from '@nestjs/common';

import { UserController } from './controllers/user/user.controller';
import { DocumentController } from './controllers/document/document.controller';
import { ClientProxyFactory, ClientsModule, TcpClientOptions, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      { name: 'USER_SERVICE', transport: Transport.TCP },
      { name: 'DOCUMENT_SERVICE', transport: Transport.TCP },
  ]),],
  controllers: [UserController, DocumentController],
  providers: [{
    provide: 'USER_SERVICE',
    useFactory: () => {
      const tokenServiceOptions: TcpClientOptions = {
        transport: Transport.TCP,
        options: {
          host: process.env.BACKEND_USER_HOST,
          port: Number(process.env.BACKEND_USER_PORT),
        },
      };
      return ClientProxyFactory.create(tokenServiceOptions);
    },
  }],
})
export class AppModule {}
