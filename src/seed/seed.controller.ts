import { Controller, Get, Ip } from '@nestjs/common';

@Controller('seed')
export class SeedController {
  @Get()
  seed(@Ip() ip): string {
    console.log(`This action seeds the database, hello ${ip}`);
    return 'have seeded the database';
  }
}
