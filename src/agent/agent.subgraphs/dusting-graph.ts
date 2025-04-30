import { StateGraph, END, START, MemorySaver } from "@langchain/langgraph";
import { LLM } from "../agent.utils/models";
import { GeneralState } from "../agent.utils/state";
import { fetchTransactionFromSignature, fetchTransactionHistoryFromAddress } from "../agent.utils/tools";
import { ChatPromptTemplate, MessagesPlaceholder } from "@langchain/core/prompts";
import { DUSTING_AGENT_PROMPT } from "../agent.utils/prompts";
import { DustingResponseSchema } from "../agent.utils/types";
import { StructuredOutputParser } from '@langchain/core/output_parsers';
import {ToolNode, toolsCondition} from "@langchain/langgraph/prebuilt";



const TOOLS = [fetchTransactionFromSignature, fetchTransactionHistoryFromAddress]
const llm_with_tools = LLM.bindTools(TOOLS)
const parser = StructuredOutputParser.fromZodSchema(DustingResponseSchema)

const tools_node = new ToolNode(TOOLS)


const CallModel = async(state: typeof GeneralState.State)=>{
    const messages = state.messages;
    const prompt = ChatPromptTemplate.fromMessages([
        ["system", DUSTING_AGENT_PROMPT],
        new MessagesPlaceholder("msgs")
    ])
    const chain = prompt.pipe(llm_with_tools)
    const response = chain.invoke({DustingResponseSchema:parser.getFormatInstructions(), msgs:messages})

    return{dustingResults: [response]}
}

const builder = new StateGraph(GeneralState)
.addNode("call_model", CallModel)
.addNode("tools", tools_node)
.addEdge(START, "call_model")
.addConditionalEdges("call_model", toolsCondition, ["tools", "__end__"])
.addEdge("tools", "call_model")
.addEdge("call_model", END)

const checkpoint = new MemorySaver()

export const DustingAgent = builder.compile({
    // checkpointer: checkpoint
})