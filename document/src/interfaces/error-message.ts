import { HttpStatus } from '@nestjs/common';

export interface IErrorMessage {
  error: boolean;
  message: string;
  status: HttpStatus;
}
