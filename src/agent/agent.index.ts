import { StateGraph, END, START, MemorySaver } from "@langchain/langgraph";
import { GeneralState } from "./agent.utils/state";
import { CollectorAgent } from "./agent.subgraphs/collector-agent.graph";
import { RecommenderAgent } from "./agent.subgraphs/recommender-agent.graph";
import { InvestorAgent } from "./agent.subgraphs/investor-agent.graph";
import { SocializerAgent } from "./agent.subgraphs/socializer-agent.graph";
import { WishlistAgent } from "./agent.subgraphs/wishlist-agent.graph";


const builder = new StateGraph(GeneralState)
.addNode("recommender_agent", RecommenderAgent)
.addNode("collector_agent", CollectorAgent)
.addNode("investor_agent", InvestorAgent)
.addNode("socializer_agent", SocializerAgent)
.addNode("wishlist_agent", WishlistAgent)
.addEdge(START, "recommender_agent")
.addEdge(START, "collector_agent")
.addEdge(START, "investor_agent")
.addEdge(START, "socializer_agent")
.addEdge(START, "wishlist_agent")

.addEdge("recommender_agent", END)
.addEdge("collector_agent", END)
.addEdge("investor_agent", END)
.addEdge("socializer_agent", END)
.addEdge("wishlist_agent", END)

const checkpoint = new MemorySaver()

export const graph = builder.compile({
    // checkpointer: checkpoint
})

