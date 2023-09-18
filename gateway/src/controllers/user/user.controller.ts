import { Controller, Inject, Query, Get, Post, Body, Req, UseGuards } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiTags } from '@nestjs/swagger';

import { sendRequestToMicroservice } from '../../utils';
import { USER_SIGN_IN_MESSAGE_PATTERN, USER_SIGN_UP_MESSAGE_PATTERN, USER_GET_BY_EMAIL } from '../../constants';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';

@ApiTags('Users api')
@Controller('user')
export class UserController {

    constructor(@Inject('USER_SERVICE') private client: ClientProxy) {}

    @Get('/sign-in')
    signIn(@Query() query) {
        return sendRequestToMicroservice(this.client, USER_SIGN_IN_MESSAGE_PATTERN, query);
    }

    @Get('/whoami')
    @UseGuards(JwtAuthGuard)
    whoAmI(@Req() req) {
        return sendRequestToMicroservice(this.client, USER_GET_BY_EMAIL, req.user.email);
    }

    @Post('/sign-up')
    signUp(@Body() body) {
        return sendRequestToMicroservice(this.client, USER_SIGN_UP_MESSAGE_PATTERN, body);
    }
}

