import { Injectable } from '@nestjs/common';
import { graph } from './agent.index';
import { PublicKey } from "@solana/web3.js";
import { HumanMessage } from '@langchain/core/messages';
import { cleanedData } from 'src/helpers/process-metadata';

@Injectable()
export class AgentService {

    async callAgent(data:any) {
        const state = {
            messages: [new HumanMessage(data)],
            metadata: cleanedData
        }

        console.log(`state defined with input: ${state.messages}`)
        
        const response = await graph.invoke(state)

        return JSON.parse(response.combined)
    }
        
  
}

