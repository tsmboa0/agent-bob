import { Injectable } from '@nestjs/common';
import { graph } from './agent.index';
import { AgentResponse } from './agent.utils/types';
import { PublicKey } from "@solana/web3.js";
import bs58 from "bs58";
import { HumanMessage } from '@langchain/core/messages';

@Injectable()
export class AgentService {

    async callAgent(data:string): Promise<AgentResponse> {
        const state = {
            messages: [new HumanMessage(data)]
        }
        const response = await graph.invoke(state)

        return JSON.parse(response.finalOutput?.content)
    }

    async isValidateData(data:string): Promise<"address" | "signature" | false> {
        // Try to decode from base58
        let decoded: Uint8Array;
        try {
            decoded = bs58.decode(data);
        } catch {
            return false;
        }

        // Check for address (32 bytes public key)
        if (decoded.length === 32) {
            try {
                const key = new PublicKey(data);
                return PublicKey.isOnCurve(key.toBytes()) ? "address" : false;
            } catch {
                return false;
            }
        }

        // Check for signature (64 or 88 bytes)
        if (decoded.length === 64 || decoded.length === 88) {
            return "signature";
        }

        return false;
    }
        
  
}

