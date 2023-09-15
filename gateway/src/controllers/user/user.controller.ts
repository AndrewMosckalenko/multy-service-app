import { Controller, Inject, Query, Get, Post, Body } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiTags } from '@nestjs/swagger';

import { sendRequestToMicroservice } from '../../utils';
import { USER_SIGN_IN_MESSAGE_PATTERN, USER_SIGN_UP_MESSAGE_PATTERN } from '../../constants';

@ApiTags('Users api')
@Controller('user')
export class UserController {

    constructor(@Inject('USER_SERVICE') private client: ClientProxy) {}

    @Get('/sign-in')
    signIn(@Query() query) {
        return sendRequestToMicroservice(this.client, USER_SIGN_IN_MESSAGE_PATTERN, query);
    }

    @Post('/sign-up')
    signUp(@Body() body) {
        return sendRequestToMicroservice(this.client, USER_SIGN_UP_MESSAGE_PATTERN, body);
    }
}

