import { Module } from '@nestjs/common';

import { UserController } from './controllers/user/user.controller';
import { DocumentController } from './controllers/document/document.controller';
import { documentTcpProvider, userTcpProvider } from './tcp-client-providers';
import { JwtModule } from '@nestjs/jwt';
import { AuthStrategy } from './auth/auth.strategy';

@Module({
  imports: [
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
