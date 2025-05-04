import { string, z } from "zod"


export const  Recommender ={
    "core_recommendations": [
      {
        "name": "GlenDronach 18 Allardice",
        "why": "Strong match to your love for sherry-cask, rich, sweet malts.",
        "price_range": "$130–$150",
        "similar_to": ["GlenDronach 12", "Glenfarclas 15"]
      }
    ]
  }

  export const investor ={
    "investment_insights": {
      "hold": {
        "name": "Macallan Rare Cask",
        "current_value": "$300",
        "estimated_appreciation": "12% over next 2 years"
      },
      "recommended_buy": {
        "name": "Springbank 15",
        "reason": "Limited allocations, rising demand on secondary market"
      }
    }
  }

  export const Collector = {
    "collection_gaps": {
      "underrepresented_regions": [
        {
          "region": "American Bourbons",
          "suggested_bottle": "Blanton’s Single Barrel"
        }
      ],
      "missing_age_segments": [
        {
          "age_group": "Over 20 years",
          "suggested_bottle": "Glenfiddich 21 Gran Reserva"
        }
      ]
    }
  }

  export const Socializer = {
    "community_trends": {
      "popular_picks": [
        "Redbreast 12 Cask Strength",
        "Compass Box Hedonism"
      ],
      "hidden_gems": [
        "Kilkerran 12"
      ]
    }
  }

  export const Wishlist = {
    "wishlist_prioritization": [
      {
        "name": "Balvenie 14 Caribbean Cask",
        "priority": 1,
        "reason": "Best fit, reasonable price"
      },
      {
        "name": "Nikka Coffey Malt",
        "priority": 2,
        "reason": "Diversifies flavor profile"
      }
    ]
  }
