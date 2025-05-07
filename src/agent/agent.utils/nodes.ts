import { GeneralState } from "./state";
import { ToolNode } from "@langchain/langgraph/prebuilt";
import { allTools } from "./tools";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { MessagesPlaceholder } from "@langchain/core/prompts";
import { llm_with_tools } from "./models";
import { AIMessage, BaseMessage, ToolMessage } from "@langchain/core/messages";


export const tool_node = new ToolNode(allTools);

export const CallModelNode = async(agent_name:string, agent_messages:BaseMessage[], system_prompt:string, response_format:any)=>{
    console.log(`entered ${agent_name} subgraph`);
    const prompt = ChatPromptTemplate.fromMessages([
        ["system", system_prompt],
        new MessagesPlaceholder("msgs")
    ])
    const chain = prompt.pipe(llm_with_tools)
    const response = await chain.invoke({response_format:response_format, msgs:agent_messages})

    return response
}

export const shouldCallToolNode = async(agent_messages:BaseMessage[])=>{
    const last_message = agent_messages[agent_messages.length -1] as AIMessage
    
    if (last_message && last_message.tool_calls?.length) return "tools";

    return "__end__"
    
}

export const callToolNode = async (agent_messages: BaseMessage[], agent_name:string) => {
    console.log(`calling the tool node...`)
    const last_message = agent_messages[agent_messages.length - 1] as AIMessage;
  
    const toolResponse = await tool_node.invoke({ messages: [last_message] });
  
    const toolMessages = (toolResponse.messages || []).filter(
      (msg: any) => msg && typeof msg._getType === "function"
    );
  
    return toolMessages;
  };
  
  