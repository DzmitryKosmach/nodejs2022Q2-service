import { Injectable } from '@nestjs/common';

const MSG_HELLO = 'Hello World!';

@Injectable()
export class AppService {
  getHello(): string {
    return MSG_HELLO;
  }
}
