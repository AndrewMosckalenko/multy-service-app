import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { AuthService } from './auth.service';
import { ICreateUserDTO, IGetUserDTO } from '../dto/user';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @MessagePattern('user_auth_sign_in')
  signIn(getUserDto: IGetUserDTO) {
    return this.authService.signIn(getUserDto);
  }

  @MessagePattern('user_auth_sign_up')
  signUp(createUserDto: ICreateUserDTO) {
    return this.authService.signUp(createUserDto);
  }
}
