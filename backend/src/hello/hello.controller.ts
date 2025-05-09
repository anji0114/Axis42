import { Controller, Get, Query } from '@nestjs/common';
import { HelloService } from './hello.service';

@Controller('api/hello')
export class HelloController {
  constructor(private readonly helloService: HelloService) {}

  @Get()
  getHello(@Query('name') name: string | undefined): { message: string } {
    return { message: this.helloService.getHello(name) };
  }
}
