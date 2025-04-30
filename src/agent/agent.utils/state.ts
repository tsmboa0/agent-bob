import { Annotation, MessagesAnnotation } from "@langchain/langgraph";



export const GeneralState = Annotation.Root({
    ...MessagesAnnotation.spec,
    dustingResults: Annotation<any>(),
    poisoningResults: Annotation<any>(),
    finalOutput: Annotation<any>()
})