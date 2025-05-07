import { StateGraph, END, START, MemorySaver } from "@langchain/langgraph";
import { GeneralState } from "../agent.utils/state";
import { WishlistPrompt } from "../agent.utils/prompts";
import { Wishlist } from "../agent.utils/types";
import { CallModelNode, shouldCallToolNode, callToolNode } from "../agent.utils/nodes";



const CallModel = async(state: typeof GeneralState.State)=>{
    const response = await CallModelNode("Wishlist", state.wishlistMessages, WishlistPrompt, Wishlist)

    return {wishlistMessages: [response]}
}

const shouldCallTool = async(state: typeof GeneralState.State)=>{
    return shouldCallToolNode(state.wishlistMessages)   
}

const toolNode = async(state: typeof GeneralState.State)=>{
    const toolResponse = await callToolNode(state.wishlistMessages, "wishlist")
    return {wishlistMessages: toolResponse}
}

const builder = new StateGraph(GeneralState)
.addNode("call_model", CallModel)
.addNode("tools", toolNode)
.addEdge(START, "call_model")
.addConditionalEdges("call_model", shouldCallTool)
.addEdge("tools", "call_model")
.addEdge("call_model", END)

const checkpoint = new MemorySaver()

export const WishlistAgent = builder.compile({
    // checkpointer: checkpoint
})