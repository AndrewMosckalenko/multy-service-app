import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UserService } from '../user.service';
import { validUser } from '../utils';
import { ICreateUserDTO, IGetUserDTO } from '../dto/user';
import { USER_ALREADY_EXIST_MESSAGE } from '../constants';

@Injectable()
export class AuthService {

    constructor(
        private userService: UserService,
        private jwtService: JwtService,
    ) {}

    async signIn({email, password} :IGetUserDTO) {
        try {
            const user = await this.userService.getUserByEmail(email);
            validUser(user, password);

            return this.createUserToken(user)
        }
        catch(e) {
            throw new UnauthorizedException(e.message);
        }
    }

    async signUp(createUserDto: ICreateUserDTO) {
        try {
            const user = await this.userService.getUserByEmail(createUserDto.email);
            if(user) { throw new Error(USER_ALREADY_EXIST_MESSAGE) }

            const newUser = await this.userService.createUser(createUserDto);

            return this.createUserToken(newUser)
        }
        catch(e) {
            throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
        }
    }

    private createUserToken(user) {
        const payload = { sub: user.id, email: user.email};
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}
