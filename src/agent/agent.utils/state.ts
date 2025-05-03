import { Annotation, MessagesAnnotation } from "@langchain/langgraph";



export const GeneralState = Annotation.Root({
    ...MessagesAnnotation.spec,
    metadata: Annotation<any>(),
    collector: Annotation<any>(),
    recommender: Annotation<any>(),
    investor: Annotation<any>(),
    socializer: Annotation<any>(),
    wishlist: Annotation<any>(),
    combined: Annotation<any>()
})