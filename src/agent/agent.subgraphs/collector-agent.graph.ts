import { StateGraph, END, START, MemorySaver } from "@langchain/langgraph";
import { GeneralState } from "../agent.utils/state";
import { CollectorPrompt } from "../agent.utils/prompts";
import { Collector } from "../agent.utils/types";
import { CallModelNode, shouldCallToolNode, callToolNode } from "../agent.utils/nodes";



const CallModel = async(state: typeof GeneralState.State)=>{
    const response = await CallModelNode("Collector", state.collectorMessages, CollectorPrompt, Collector)

    return {collectorMessages: [response]}
}

const shouldCallTool = async(state: typeof GeneralState.State)=>{
    return shouldCallToolNode(state.collectorMessages)
}

const toolNode = async(state: typeof GeneralState.State)=>{
    const toolResponse = await callToolNode(state.collectorMessages, "collector")
    return {collectorMessages: toolResponse}
}

const builder = new StateGraph(GeneralState)
.addNode("call_model", CallModel)
.addNode("tools", toolNode)
.addEdge(START, "call_model")
.addConditionalEdges("call_model", shouldCallTool)
.addEdge("tools", "call_model")
.addEdge("call_model", END)

const checkpoint = new MemorySaver()

export const CollectorAgent = builder.compile({
    // checkpointer: checkpoint
})