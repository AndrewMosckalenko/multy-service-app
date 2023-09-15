import { HttpException } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { firstValueFrom } from "rxjs";

export async function sendRequestToMicroservice(client: ClientProxy, messagePattern: string, data) {
    const res = await client.send(messagePattern, data);
    const resData = await firstValueFrom(res);

    if(resData.err) { throw new HttpException(resData.message, resData.status ); }

    return res
}