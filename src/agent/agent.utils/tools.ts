import { tool } from "@langchain/core/tools";
import { z } from "zod";
import { HeliusService } from "src/helius/helius.service";

const heliusService = new HeliusService();

export const fetchTransactionFromSignature = tool(
    async({txHash})=>{
        const payload = await heliusService.getTransactionDetails(txHash);
        console.log(`The payload is: ${payload}`)
        return payload
    },
    {
        name: "Fetch transaction details from signature/transaction hash",
        description: "This tool is used for fetching the transaction details given a transaction hash.",
        schema: z.object({
            txHash: z.string().describe("This is the transaction hash whose details is to be fetched.")
        })
    }
)


export const fetchTransactionHistoryFromAddress = tool(
    async({address, limit})=>{
        const payload = heliusService.fetchTransactionHistory(address, limit)
        console.log(`The last 2 transactions in the history are: ${payload[0]} and ${payload[1]}`)
        return payload
    },
    {
        name:"Fetch transaction history",
        description:"This tool is used for fetching the transaction history of a wallet",
        schema: z.object({
            address: z.string().describe("The address whose history is to be fetched"),
            limit: z.number().describe("This is the number of past transactions to fetch. Ensure you consider your context window and other details to accurately set a limit.")
        })
    }
)