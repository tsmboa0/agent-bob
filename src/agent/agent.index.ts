import { StateGraph, END, START, MemorySaver } from "@langchain/langgraph";
import { GeneralState } from "./agent.utils/state";
import { SupervisorAgent } from "./agent.subgraphs/supervisor.graph";
import { PoisoningAgent } from "./agent.subgraphs/poisoning-graph";
import { DustingAgent } from "./agent.subgraphs/dusting-graph";



const builder = new StateGraph(GeneralState)
.addNode("supervisor_agent", SupervisorAgent)
.addNode("poisoning_detector_agent", PoisoningAgent)
.addNode("dusting_detector_agent", DustingAgent)
.addEdge(START, "dusting_detector_agent")
.addEdge(START, "poisoning_detector_agent")
.addEdge("dusting_detector_agent", "supervisor_agent")
.addEdge("poisoning_detector_agent", "supervisor_agent")
.addEdge("supervisor_agent", END)

const checkpoint = new MemorySaver()

export const graph = builder.compile({
    // checkpointer: checkpoint
})

