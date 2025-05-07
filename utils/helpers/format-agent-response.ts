

export const formatAgentResponse = (response:any)=>{
    const collectorResponse = response.collectorMessages[response.collectorMessages.length -1].content;
    const recommenderResponse = response.recommenderMessages[response.recommenderMessages.length -1].content;
    const investorResponse = response.investorMessages[response.investorMessages.length -1].content;
    const socializerResponse = response.socializerMessages[response.socializerMessages.length -1].content;
    const wishlistResponse = response.wishlistMessages[response.wishlistMessages.length -1].content;

    const parsedCollector = JSON.parse(JSON.parse(JSON.stringify(collectorResponse)))
    const parsedCRecommender = JSON.parse(JSON.parse(JSON.stringify(recommenderResponse)))
    const parsedInvestor = JSON.parse(JSON.parse(JSON.stringify(investorResponse)))
    const parsedSocializer= JSON.parse(JSON.parse(JSON.stringify(socializerResponse)))
    const parsedWishlist = JSON.parse(JSON.parse(JSON.stringify(wishlistResponse)))

    const combined_results = {
        recommender: parsedCRecommender,
        collector: parsedCollector,
        investor: parsedInvestor,
        socializer: parsedSocializer,
        wishlist: parsedWishlist
    }

    return combined_results
}