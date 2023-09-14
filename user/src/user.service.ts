import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

import { ICreateUserDTO } from './dto/user';
import { validateUserCreateDTO } from './utils';
import { USER_ALREADY_EXIST_MESSAGE } from './constants';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>
    ) {}

    async createUser(newUser: ICreateUserDTO) {
        try {
            validateUserCreateDTO(newUser);

            const userByEmail = await this.getUserByEmail(newUser.email);
            if(userByEmail) { throw new Error(USER_ALREADY_EXIST_MESSAGE); }
            
            const user = await this.userRepository.create(newUser);
            await this.userRepository.save(user);
            
            return user;
        }
        catch(e) {
            throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
        }
    }

    getUserByEmail(email: string) {
        try {
            return this.userRepository.findOneBy({ email });
        }
        catch(e) {
            throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
        }
    }

    getUserById(id: number) {
        try {
            return this.userRepository.findOneBy({ id });
        }
        catch(e) {
            throw new HttpException(e.message, HttpStatus.BAD_REQUEST); 
        }
    }
}

