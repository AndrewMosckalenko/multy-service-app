import { Controller, Inject, Query, Get, Post, Body } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Controller('user')
export class UserController {

    constructor(@Inject('USER_SERVICE') private client: ClientProxy) {}

    @Get('/sign-in')
    signIn(@Query() query) {
        return this.client.send('user_auth_sign_in', {email: query.email, password: query.password})
    }

    @Post('/sign-up')
    signUp(@Body() body) {
        return this.client.send('user_auth_sign_up', body)
    }
}

