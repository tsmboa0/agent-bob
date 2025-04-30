import { PublicKey } from "@solana/web3.js"
import { string, z } from "zod"

export interface AgentResponse {
    attack_detected: boolean;
    is_dusting_attack: boolean;
    is_poisoning_attack: boolean;
    is_scam: boolean;
    confidence: number;
    dusting_details: {
        dust_threshold:string;
        total_dust_transaction:number;
        unique_recipients: number;
        avg_tps: number;
        notes: string
    };
    poisoning_details: {
        sender_address: string,
        similarity_score: number,
        matched_with_history: boolean,
        notes: string
    };
    scam_transactions: string[]
}

export interface AgentRequest {
    query: string | PublicKey
}

// Interface for parsed transaction data
export interface ParsedTransaction {
    signature: string;
    timestamp: string;
    blockTime: number;
    sender: string;
    recipient: string;
    amount: string;
    tokenSymbol: string;
    success: boolean;
    type: string;
    fee: string;
}

export const AgentResponseSchema = z.object({
    attack_detected: z.boolean().describe("True if an attack is detected"),
    is_dusting_attack: z.boolean(),
    is_poisoning_attack: z.boolean(),
    is_scam: z.boolean()
        .describe("is the sender wallet or wallet provided a duster or a poisoner or both or none? only flag false if it is none"),
    confidence: z.number().min(0).max(1).describe("The confidence score"),
    dusting_details: z.object({
        dust_threshold: z.string(),
        total_dust_transactions: z.number(),
        unique_recipients: z.number(),
        avg_tps: z.number(),
        notes: z.string().describe("any notable behavior or anomalies")
    }),
    poisoning_details: z.object({
        sender_address: z.string(),
        similarity_score: z.number(),
        matched_with_history: z.boolean(),
        notes: z.string().describe("any notable behavior or anomalies")
    }),
    scam_transactions: z.array(
        z.object({
            signature: z.string().describe("The transaction signature of the detected spam transaction.")
        }))
        .describe("This is an array of spam transactions gotten from the user's hsitory. This array will be used by wallet apps to help users filter bad transaction histories."),
})

export const DustingResponseSchema = z.object({
    attack_detected: z.boolean().describe("True if an attack is detected"),
    attack_type: z.enum(["DUSTING", "POISONING"]).describe("Type of attack"),
    is_scam: z.boolean().describe("is the sender wallet or wallet provided a duster?"),
    confidence: z.number().min(0).max(1).describe("The confidence score"),
    details: z.object({
      dust_threshold: z.string(),
      total_dust_transactions: z.number(),
      unique_recipients: z.number(),
      avg_tps: z.number(),
      notes: z.string().describe("any notable behavior or anomalies")
    }),
    scam_transactions: z.array(
        z.object({
            signature: z.string().describe("The transaction signature of the detected spam transaction.")
        }))
        .describe("This is an array of spam transactions gotten from the user's hsitory. This array will be used by wallet apps to help users filter bad transaction histories.")
})

export const PoisoningResponseSchema = z.object({
    attack_detected: z.boolean().describe("True if an attack is detected"),
    attack_type: z.enum(["DUSTING", "POISONING"]).describe("Type of attack"),
    is_scam: z.boolean().describe("is the sender wallet or wallet provided a poisoner?"),
    confidence: z.number().min(0).max(1).describe("The confidence score"),
    details: z.object({
      sender_address: z.string(),
      similarity_score: z.number().min(0).max(1).describe("The similarity score"),
      matched_with_history: z.boolean(),
      notes: z.string().describe("pattern observed or not")
    }),
    scam_transactions: z.array(
        z.object({
            signature: z.string().describe("The transaction signature of the detected spam transaction.")
        }))
        .describe("This is an array of potential address poisoning transactions gotten from the user/reciever hsitory. This array will be used by wallet apps to help users filter bad transaction histories.")
})