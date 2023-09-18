import { Module } from '@nestjs/common';

import { UserController } from './controllers/user/user.controller';
import { DocumentController } from './controllers/document/document.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { documentTcpProvider, userTcpProvider } from './tcp-client-providers';
import { JwtModule } from '@nestjs/jwt';
import { AuthStrategy } from './auth/auth.strategy';

@Module({
  imports: [
    ClientsModule.register([
      { name: 'USER_SERVICE', transport: Transport.TCP },
      { name: 'DOCUMENT_SERVICE', transport: Transport.TCP },
    ]),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: process.env.JWT_EXPIRE },
    }),],
  controllers: [UserController, DocumentController],
  providers: [
    userTcpProvider,
    documentTcpProvider,
    AuthStrategy,
  ],
})
export class AppModule {}
