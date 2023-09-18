import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { User } from './entities/user.entity';
import { ICreateUserDTO } from './dto/user';
import { validateUserCreateDTO } from './utils';

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>
    ) {}

    async createUser(newUser: ICreateUserDTO) {
        try {
            validateUserCreateDTO(newUser);
            
            const user = await this.userRepository.create(newUser);
            await this.userRepository.save(user);
            
            return { ...user, password: null };
        }
        catch(e) {
            throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
        }
    }

    async getUserByEmail(email: string) {
        try {
            const user = await this.userRepository.findOneBy({ email });
                return user ? {...user, password: null } : user;
        }
        catch(e) {
            throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
        }
    }

    getUserByEmailWithPassword(email: string) {
        try {
            return this.userRepository.findOneBy({ email });
        }
        catch(e) {
            throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
        }
    }

    async getUserById(id: number) {
        try {
            const user = await this.userRepository.findOneBy({ id });
            return user ? {...user, password: null } : user;
        }
        catch(e) {
            throw new HttpException(e.message, HttpStatus.BAD_REQUEST); 
        }
    }
}

