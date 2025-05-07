import { Injectable } from '@nestjs/common';
import { graph } from './agent.index';
import { HumanMessage } from '@langchain/core/messages';
import { formatAgentResponse } from 'utils/helpers/format-agent-response';

@Injectable()
export class AgentService {

    async callAgent(barDetails:any) {
        const state = {
            recommenderMessages: [new HumanMessage(JSON.stringify(barDetails, null, 2))],
            collectorMessages: [new HumanMessage(JSON.stringify(barDetails, null, 2))],
            investorMessages: [new HumanMessage(JSON.stringify(barDetails, null, 2))],
            socializerMessages: [new HumanMessage(JSON.stringify(barDetails, null, 2))],
            wishlistMessages: [new HumanMessage(JSON.stringify(barDetails, null, 2))],
        }
        // Invoke the agent graph
        const response = await graph.invoke(state)

        const formatedResponse = formatAgentResponse(response)

        return formatedResponse
    }
        
  
}

