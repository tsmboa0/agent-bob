import { ChatGroq } from "@langchain/groq";
import { ChatOpenAI } from "@langchain/openai";
import * as dotenv from "dotenv"

dotenv.config()
// Use this for Groq API keys
export const LLM = new ChatGroq({
    model: "llama-3.3-70b-versatile", //llama-3.3-70b-versatile //deepseek-r1-distill-llama-70b
    temperature: 0.7,
    apiKey: process.env.GROQ_API_KEY
})


// Use this for OpenAI API keys
// export const LLM = new ChatOpenAI({
//     model: "",
//     temperature: 0.7,
//     apiKey: process.env.GROQ_API_KEY
// })