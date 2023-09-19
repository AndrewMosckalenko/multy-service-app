import { Module } from '@nestjs/common';

import { UserController } from './controllers/user/user.controller';
import { DocumentController } from './controllers/document/document.controller';
import { documentTcpProvider, userTcpProvider } from './tcp-client-providers';
import { JwtModule } from '@nestjs/jwt';
import { AuthStrategy } from './auth/auth.strategy';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      { name: 'USER_SERVICE', transport: Transport.TCP, options: {
        host: process.env.BACKEND_USER_HOST,
        port: Number(process.env.BACKEND_USER_PORT),
      }, },
      { name: 'DOCUMENT_SERVICE', transport: Transport.TCP, options: {
        host: process.env.BACKEND_DOCUMENT_HOST,
        port: Number(process.env.BACKEND_DOCUMENT_PORT),
      }, },
    ]),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: process.env.JWT_EXPIRE },
    }),],
  controllers: [UserController, DocumentController],
  providers: [
    AuthStrategy,
  ],
})
export class AppModule {}
