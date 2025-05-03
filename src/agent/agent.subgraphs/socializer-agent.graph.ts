import { StateGraph, END, START, MemorySaver } from "@langchain/langgraph";
import { LLM } from "../agent.utils/models";
import { GeneralState } from "../agent.utils/state";
import { ChatPromptTemplate, MessagesPlaceholder } from "@langchain/core/prompts";
import { SocializerPrompt } from "../agent.utils/prompts";
import { Socializer } from "../agent.utils/types";



const CallModel = async(state: typeof GeneralState.State)=>{
    console.log("entered socializer subgraph")
    const {messages, metadata} = state;
    const prompt = ChatPromptTemplate.fromMessages([
        ["system", SocializerPrompt]
    ])
    const chain = prompt.pipe(LLM)
    const response = await chain.invoke({socializer_response:Socializer, msgs:messages})

    console.log(`the socializer response is ${response.content}`)

    return{socializer: response.content}
}

const builder = new StateGraph(GeneralState)
.addNode("call_model", CallModel)
.addEdge(START, "call_model")
.addEdge("call_model", END)

const checkpoint = new MemorySaver()

export const SocializerAgent = builder.compile({
    // checkpointer: checkpoint
})