import { Module } from '@nestjs/common';
import { AgentController } from './agent.controller';
import { AgentService } from './agent.service';
import { BaxusService } from 'src/baxus/baxus.service';

@Module({
  imports: [],
  providers: [AgentService, BaxusService],
  controllers: [AgentController],
  exports: [AgentService],
})
export class AgentModule {}
