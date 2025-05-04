

export const formatAgentResponse = (response:any)=>{
    const parsedCollector = JSON.parse(response.collector)
    const parsedCRecommender = JSON.parse(response.recommender)
    const parsedInvestor = JSON.parse(response.investor)
    const parsedSocializer= JSON.parse(response.socializer)
    const parsedWishlist = JSON.parse(response.wishlist)

    const combined_results = {
        recommender: parsedCRecommender,
        collector: parsedCollector,
        investor: parsedInvestor,
        socializer: parsedSocializer,
        wishlist: parsedWishlist
    }

    return combined_results
}