import { StateGraph, END, START, MemorySaver } from "@langchain/langgraph";
import { GeneralState } from "../agent.utils/state";
import { InvestorPrompt } from "../agent.utils/prompts";
import { investor } from "../agent.utils/types";
import { CallModelNode, shouldCallToolNode, callToolNode } from "../agent.utils/nodes";



const CallModel = async(state: typeof GeneralState.State)=>{
    const response = await CallModelNode("Investor", state.investorMessages, InvestorPrompt, investor)

    return {investorMessages: [response]}
}

const shouldCallTool = async(state: typeof GeneralState.State)=>{
    return shouldCallToolNode(state.investorMessages)   
}

const toolNode = async(state: typeof GeneralState.State)=>{
    const toolResponse = await callToolNode(state.investorMessages, "investor")
    return {investorMessages: toolResponse}
}



const builder = new StateGraph(GeneralState)
.addNode("call_model", CallModel)
.addNode("tools", toolNode)
.addEdge(START, "call_model")
.addConditionalEdges("call_model", shouldCallTool)
.addEdge("tools", "call_model")
.addEdge("call_model", END)

const checkpoint = new MemorySaver()

export const InvestorAgent = builder.compile({
    // checkpointer: checkpoint
})