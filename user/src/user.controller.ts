import { Controller } from '@nestjs/common';
import { UserService } from './user.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class UserController {
  constructor(private userService: UserService) {}

  @MessagePattern('user_by_email')
  signIn(email: string) {
    return this.userService.getUserByEmail(email);
  }
}
