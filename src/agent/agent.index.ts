import { StateGraph, END, START, MemorySaver } from "@langchain/langgraph";
import { GeneralState } from "./agent.utils/state";
import { CollectorAgent } from "./agent.subgraphs/collector-agent.graph";
import { RecommenderAgent } from "./agent.subgraphs/recommender-agent.graph";
import { InvestorAgent } from "./agent.subgraphs/investor-agent.graph";
import { SocializerAgent } from "./agent.subgraphs/socializer-agent.graph";
import { WishlistAgent } from "./agent.subgraphs/wishlist-agent.graph";

const Combine = async(state: typeof GeneralState.spec)=>{
    const {collector, recommender, investor, socializer, wishlist} = state
    const combined_results = {
        ...collector,
        ...recommender,
        ...investor,
        ...socializer,
        ...wishlist
    }

    console.log(`The combined result is: ${combined_results}`)

    return {combined: combined_results}

}

const builder = new StateGraph(GeneralState)
.addNode("recommender_agent", RecommenderAgent)
.addNode("collector_agent", CollectorAgent)
.addNode("investor_agent", InvestorAgent)
.addNode("socializer_agent", SocializerAgent)
.addNode("wishlist_agent", WishlistAgent)
.addNode("combine", Combine)
.addEdge(START, "recommender_agent")
.addEdge("recommender_agent", "collector_agent")
.addEdge("collector_agent", "investor_agent")
.addEdge("investor_agent", "socializer_agent")
.addEdge("socializer_agent", "wishlist_agent")
.addEdge("wishlist_agent", "combine")
.addEdge("combine", END)

const checkpoint = new MemorySaver()

export const graph = builder.compile({
    // checkpointer: checkpoint
})

