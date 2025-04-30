import { Module } from '@nestjs/common';
import { HeliusController } from './helius.controller';
import { HeliusService } from './helius.service';

@Module({
  providers: [HeliusService],
  controllers: [HeliusController],
})
export class HeliusModule {}
