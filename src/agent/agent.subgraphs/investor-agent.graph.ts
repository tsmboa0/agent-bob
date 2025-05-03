import { StateGraph, END, START, MemorySaver } from "@langchain/langgraph";
import { LLM } from "../agent.utils/models";
import { GeneralState } from "../agent.utils/state";
import { ChatPromptTemplate, MessagesPlaceholder } from "@langchain/core/prompts";
import { InvestorPrompt } from "../agent.utils/prompts";
import { investor } from "../agent.utils/types";



const CallModel = async(state: typeof GeneralState.State)=>{
    console.log("entered investor subgraph")
    const {messages, metadata} = state;
    const prompt = ChatPromptTemplate.fromMessages([
        ["system", InvestorPrompt]
    ])
    const chain = prompt.pipe(LLM)
    const response = await chain.invoke({investor_response:investor, msgs:messages})

    console.log(`the investor response is ${response.content}`)

    return{investor: response.content}
}

const builder = new StateGraph(GeneralState)
.addNode("call_model", CallModel)
.addEdge(START, "call_model")
.addEdge("call_model", END)

const checkpoint = new MemorySaver()

export const InvestorAgent = builder.compile({
    // checkpointer: checkpoint
})