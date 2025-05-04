import { StateGraph, END, START, MemorySaver } from "@langchain/langgraph";
import { LLM } from "../agent.utils/models";
import { GeneralState } from "../agent.utils/state";
import { ChatPromptTemplate, MessagesPlaceholder } from "@langchain/core/prompts";
import { WishlistPrompt } from "../agent.utils/prompts";
import { Wishlist } from "../agent.utils/types";



const CallModel = async(state: typeof GeneralState.State)=>{
    console.log("entered wishlist subgraph")
    const {messages} = state;
    const prompt = ChatPromptTemplate.fromMessages([
        ["system", WishlistPrompt]
    ])
    const chain = prompt.pipe(LLM)
    console.log("invoking chain")
    const response = await chain.invoke({wishlist_response:Wishlist, msgs:messages})

    console.log(`the wishlist response is ${response.content}`)

    return{wishlist: JSON.parse(JSON.stringify(response.content))}
}

const builder = new StateGraph(GeneralState)
.addNode("call_model", CallModel)
.addEdge(START, "call_model")
.addEdge("call_model", END)

const checkpoint = new MemorySaver()

export const WishlistAgent = builder.compile({
    // checkpointer: checkpoint
})