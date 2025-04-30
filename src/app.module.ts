import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HeliusModule } from './helius/helius.module';
import { AgentModule } from './agent/agent.module';

@Module({
  imports: [HeliusModule, AgentModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
