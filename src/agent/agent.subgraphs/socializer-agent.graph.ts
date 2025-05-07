import { StateGraph, END, START, MemorySaver } from "@langchain/langgraph";
import { GeneralState } from "../agent.utils/state";
import { SocializerPrompt } from "../agent.utils/prompts";
import { Socializer } from "../agent.utils/types";
import { CallModelNode, shouldCallToolNode, callToolNode } from "../agent.utils/nodes";



const CallModel = async(state: typeof GeneralState.State)=>{
    const response = await CallModelNode("socializer", state.socializerMessages, SocializerPrompt, Socializer)

    return {socializerMessages: [response]}
}

const shouldCallTool = async(state: typeof GeneralState.State)=>{
    return shouldCallToolNode(state.socializerMessages)
}

const toolNode = async(state: typeof GeneralState.State)=>{
    const toolResponse = await callToolNode(state.socializerMessages, "socializer")
    return {socializerMessages: toolResponse}
}

const builder = new StateGraph(GeneralState)
.addNode("call_model", CallModel)
.addNode("tools", toolNode)
.addEdge(START, "call_model")
.addConditionalEdges("call_model", shouldCallTool)
.addEdge("tools", "call_model")
.addEdge("call_model", END)

const checkpoint = new MemorySaver()

export const SocializerAgent = builder.compile({
    // checkpointer: checkpoint
})