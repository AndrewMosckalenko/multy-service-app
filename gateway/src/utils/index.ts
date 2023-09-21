import { HttpException } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

export async function sendRequestToMicroservice<DataType>(
  client: ClientProxy,
  messagePattern: string,
  data: DataType,
) {
  const res = await client.send(messagePattern, data).toPromise();

  if (res.err) {
    throw new HttpException(res.message, res.status);
  }

  return res;
}
