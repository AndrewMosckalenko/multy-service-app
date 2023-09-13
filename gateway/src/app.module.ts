import { Module } from '@nestjs/common';

import { UserController } from './controllers/user/user.controller';
import { DocumentController } from './controllers/document/document.controller';

@Module({
  imports: [],
  controllers: [UserController, DocumentController],
  providers: [],
})
export class AppModule {}
