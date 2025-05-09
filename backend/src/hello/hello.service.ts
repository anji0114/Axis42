import { Injectable } from '@nestjs/common';

@Injectable()
export class HelloService {
  getHello(name: string | undefined): string {
    return `Hello ${name || 'unnamed'}`;
  }
}
