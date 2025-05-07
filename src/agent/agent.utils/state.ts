import { BaseMessage } from "@langchain/core/messages";
import { Annotation, MessagesAnnotation, messagesStateReducer } from "@langchain/langgraph";

const messages_reducer = {
    reducer: messagesStateReducer,
    default: ()=>[]
}

export const GeneralState = Annotation.Root({
    recommenderMessages: Annotation<BaseMessage[]>(messages_reducer),
    collectorMessages: Annotation<BaseMessage[]>(messages_reducer),
    investorMessages: Annotation<BaseMessage[]>(messages_reducer),
    socializerMessages: Annotation<BaseMessage[]>(messages_reducer),
    wishlistMessages: Annotation<BaseMessage[]>(messages_reducer),
})