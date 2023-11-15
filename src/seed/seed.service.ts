import { Injectable } from '@nestjs/common';
@Injectable()
export class SeedService {
  returnHello(): string {
    return 'Hello World!';
  }
}
