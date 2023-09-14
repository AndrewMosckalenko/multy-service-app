import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { UserController } from './user.controller';
import { UserService } from './user.service';
import { postgresOptions } from './db/postgres';
import { User } from './entities/user.entity';

@Module({
    imports: [TypeOrmModule.forRoot(postgresOptions), TypeOrmModule.forFeature([User])],
    controllers: [UserController],
    providers: [UserService],
})
export class UserModule {}
