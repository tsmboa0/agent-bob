import { StateGraph, END, START, MemorySaver } from "@langchain/langgraph";
import { LLM } from "../agent.utils/models";
import { GeneralState } from "../agent.utils/state";
import { ChatPromptTemplate, MessagesPlaceholder } from "@langchain/core/prompts";
import { RecommenderPrompt } from "../agent.utils/prompts";
import { Recommender } from "../agent.utils/types";



const CallModel = async(state: typeof GeneralState.State)=>{
    console.log("entered recommender subgraph")
    const {messages, metadata} = state;
    const prompt = ChatPromptTemplate.fromMessages([
        ["system", RecommenderPrompt]
    ])
    const chain = prompt.pipe(LLM)
    const response = await chain.invoke({recommender_response:Recommender, msgs:messages})

    console.log(`the recommender response is ${response.content}`)

    return{recommender: response.content}
}

const builder = new StateGraph(GeneralState)
.addNode("call_model", CallModel)
.addEdge(START, "call_model")
.addEdge("call_model", END)

const checkpoint = new MemorySaver()

export const RecommenderAgent = builder.compile({
    // checkpointer: checkpoint
})