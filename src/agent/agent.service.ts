import { Injectable } from '@nestjs/common';
import { graph } from './agent.index';
import { PublicKey } from "@solana/web3.js";
import { HumanMessage } from '@langchain/core/messages';
import { searchRelevantBottlesFromBar } from '../../helpers/searchBM25';
import { formatAgentResponse } from 'helpers/format-agent-response';

@Injectable()
export class AgentService {

    async callAgent(barDetails:any) {
        const bm25_matches = await searchRelevantBottlesFromBar(barDetails)
        const state = {
            messages: [new HumanMessage(JSON.stringify(barDetails, null, 2))],
            metadata: bm25_matches
        }
        // Invoke the agent graph
        const response = await graph.invoke(state)

        const formatedResponse = formatAgentResponse(response)

        return formatedResponse
    }
        
  
}

