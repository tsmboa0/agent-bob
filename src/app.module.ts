import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BaxusModule } from './baxus/baxus.module';
import { AgentModule } from './agent/agent.module';

@Module({
  imports: [BaxusModule, AgentModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
