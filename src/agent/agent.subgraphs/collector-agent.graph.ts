import { StateGraph, END, START, MemorySaver } from "@langchain/langgraph";
import { LLM } from "../agent.utils/models";
import { GeneralState } from "../agent.utils/state";
import { ChatPromptTemplate, MessagesPlaceholder } from "@langchain/core/prompts";
import { CollectorPrompt } from "../agent.utils/prompts";
import { Collector } from "../agent.utils/types";



const CallModel = async(state: typeof GeneralState.State)=>{
    console.log("entered collector subgraph")
    const {messages} = state;
    const prompt = ChatPromptTemplate.fromMessages([
        ["system", CollectorPrompt]
    ])
    const chain = prompt.pipe(LLM)
    const response = await chain.invoke({collector_response:Collector, msgs:messages})

    console.log(`the collector response is ${response.content}`)

    return{collector: JSON.parse(JSON.stringify(response.content))}
}

const builder = new StateGraph(GeneralState)
.addNode("call_model", CallModel)
.addEdge(START, "call_model")
.addEdge("call_model", END)

const checkpoint = new MemorySaver()

export const CollectorAgent = builder.compile({
    // checkpointer: checkpoint
})