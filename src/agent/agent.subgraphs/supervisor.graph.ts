import { StateGraph, END, START, MemorySaver } from "@langchain/langgraph";
import { LLM } from "../agent.utils/models";
import { GeneralState } from "../agent.utils/state";
import { ChatPromptTemplate, MessagesPlaceholder } from "@langchain/core/prompts";
import { SUPERVISOR_PROMPT } from "../agent.utils/prompts";
import { AgentResponseSchema } from "../agent.utils/types";
import { StructuredOutputParser } from '@langchain/core/output_parsers';


const parser = StructuredOutputParser.fromZodSchema(AgentResponseSchema)


const CallModel = async(state: typeof GeneralState.State)=>{
    const messages = state.messages;
    const dusting_result = state.dustingResults;
    const poisoning_result = state.poisoningResults;
    const output_format = state.finalOutput;
    const prompt = ChatPromptTemplate.fromMessages([
        ["system", SUPERVISOR_PROMPT]
    ])
    const chain = prompt.pipe(LLM)
    const response = chain.invoke({PoisoningResponseSchema:parser.getFormatInstructions(), dusting_results: dusting_result, poisoning_results:poisoning_result, output_format: output_format})

    return{messages: [response]}
}

const builder = new StateGraph(GeneralState)
.addNode("call_model", CallModel)
.addEdge(START, "call_model")
.addEdge("call_model", END)

const checkpoint = new MemorySaver()

export const SupervisorAgent = builder.compile({
    // checkpointer: checkpoint
})