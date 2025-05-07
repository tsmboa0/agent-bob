import { ChatGroq } from "@langchain/groq";
import { ChatOpenAI } from "@langchain/openai";
import { ChatAnthropic } from "@langchain/anthropic";
import { MistralAI } from "@langchain/mistralai";
import * as dotenv from "dotenv"
import { allTools } from "./tools";

dotenv.config()

let LLM:any;

if(process.env.GROQ_API_KEY){
    LLM = new ChatGroq({
        model: "llama-3.3-70b-versatile",
        temperature: 0.7,
        apiKey: process.env.GROQ_API_KEY
    })
}else if(process.env.OPENAI_API_KEY){
    LLM = new ChatOpenAI({
        model: "gpt-3.5-turbo",
        temperature: 0.7,
        apiKey: process.env.OPENAI_API_KEY
    });
}else if(process.env.ANTHROPIC_API_KEY){
    LLM = new ChatAnthropic({
        model: "claude-3-sonnet-20240229",
        temperature: 0.7,
        apiKey: process.env.ANTHROPIC_API_KEY
    });
}
else{
    throw new Error("Error: You need an API key from OPENAI, GROQ, ANTHROPIC or MISTRAL")
} 

export const llm_with_tools = LLM.bindTools(allTools);