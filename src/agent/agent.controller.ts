import { Controller, Post, Get, Body, Param, BadRequestException, Logger } from '@nestjs/common';
import { AgentService } from './agent.service';
import { BaxusService } from 'src/baxus/baxus.service';

@Controller('agent/recommend')
export class AgentController {
  constructor(
    private readonly agentService: AgentService,
    private readonly baxusService: BaxusService
  ) {}

  @Get(':username')
  async analyze(@Param('username') username: string) {

    const userBarDetails = await this.baxusService.fetchUserData(username)

    if(!userBarDetails){
        throw new BadRequestException("An error occured. Ensure you have provided a valid username")
    }

    return await this.agentService.callAgent(userBarDetails)
  }
}
