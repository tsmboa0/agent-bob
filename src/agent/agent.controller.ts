import { Controller, Post, Body, BadRequestException, Logger } from '@nestjs/common';
import { AgentService } from './agent.service';
import { BaxusService } from 'src/baxus/baxus.service';

@Controller('agent')
export class AgentController {
  constructor(
    private readonly agentService: AgentService,
    private readonly baxusService: BaxusService
  ) {}

  @Post('recommend')
  async analyze(@Body('username') username: string) {

    const userBarDetails = await this.baxusService.fetchUserData(username)

    if(!userBarDetails){
        throw new BadRequestException("An error occured. Ensure you have provided a valid username")
    }
    console.log("calling the agent now")

    return await this.agentService.callAgent(userBarDetails)
  }
}
