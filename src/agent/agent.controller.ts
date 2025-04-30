import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { AgentService } from './agent.service';

@Controller('agent')
export class AgentController {
  constructor(private readonly agentService: AgentService) {}

  @Post('analyze')
  async analyze(@Body('input') input: string) {
    if(!this.agentService.isValidateData(input)){
        throw new BadRequestException("The input data mus be a valid solana address or signature")
    }

    return await this.agentService.callAgent(input)
  }
}
