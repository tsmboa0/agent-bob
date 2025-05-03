import { Module } from '@nestjs/common';
import { BaxusService } from './baxus.service';

@Module({
  providers: [BaxusService],
  controllers: [],
})
export class BaxusModule {}
