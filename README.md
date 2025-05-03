# BAXUS-Bob: Advanced Whisky Recommendation System

A multi-agent AI recommendation system for analyzing whisky collections and providing personalized bottle recommendations within the BAXUS ecosystem.

## Overview

BAXUS-Bob is an intelligent whisky recommendation platform that analyzes users' virtual bar collections to deliver tailored bottle suggestions. Unlike simple matching systems, Bob leverages a multi-agent architecture to provide comprehensive collection insights, investment advice, gap analysis, and personalized recommendations.

## Architecture

Bob employs a modular multi-agent system where specialized agents handle different aspects of whisky analysis and recommendation:

```
                             ┌─────────────────────────┐
                             │    Main Orchestrator   │
                             │       (Bob Core)       │
                             └───────────┬────────────┘
                                         │
     ┌───────────────────────────────────┼───────────────────────────────┐
     │                                   │                               │
┌────────────────────┐       ┌───────────────────────┐      ┌────────────────────┐
│ Bob the Recommender│       │    Bob the Investor   │      │ Bob the Collector  │
│ (Taste + Profile)  │       │ (Aging + Value Engine)│      │(Diversification+Gap)│
└────────┬───────────┘       └──────────┬────────────┘      └─────────┬──────────┘
         │                              │                             │
         │                              │                             │
┌────────────────────┐       ┌───────────────────────┐      ┌────────────────────┐
│ Bob the Socializer │       │   Bob the Pairing     │      │ Bob the Wishlist   │
│ (Community Trends) │       │  (Occasion + Food)    │      │(Wishlist Optimizer)│
└────────────────────┘       └───────────────────────┘      └────────────────────┘
```

### Agent Specializations

1. **Bob the Recommender** - Primary taste profiling and personalized bottle matching
2. **Bob the Investor** - Analysis of bottle value, investment potential, and aging insights
3. **Bob the Collector** - Collection gap analysis and diversity recommendations
4. **Bob the Socializer** - Community trend analysis and social recommendations
5. **Bob the Pairing** - Occasion and food pairing suggestions
6. **Bob the Wishlist** - Wishlist optimization and purchasing roadmap

## Features

- **Taste Profile Builder**: Creates a personalized flavor profile based on existing bottles
- **Aging & Maturation Insights**: Predicts bottle appreciation and identifies aging opportunities
- **Collection Gap Analysis**: Identifies underrepresented regions, styles, and age categories
- **Community Taste Alignment**: Compares user collections with trending bottles
- **Pairing & Occasion Recommendations**: Suggests when to drink and what to pair with bottles
- **Wishlist Optimization**: Prioritizes future purchases based on collection fit and budget
- **Advanced Ranking Engine**: Multi-dimensional scoring system for personalized recommendations

## API Response Format

```json
{
  "user": {
    "username": "whiskylover123",
    "total_bottles_analyzed": 34,
    "wishlist_bottles": 5,
    "analysis_date": "2025-05-02"
  },
  "recommendations": {
    "top_recommendations": [
      {
        "name": "GlenDronach 18 Allardice",
        "why": "Strong match to your love for sherry-cask, rich, sweet malts.",
        "price_range": "$130–$150",
        "similar_to": ["GlenDronach 12", "Glenfarclas 15"]
      },
      {
        "name": "Lagavulin 12 Special Release",
        "why": "Expands your Islay smoky profile, complements your Laphroaig and Ardbeg.",
        "price_range": "$140–$160",
        "complements": ["Laphroaig", "Ardbeg"]
      }
    ],
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
    },
    "collection_gaps": {
      "underrepresented_regions": [
        {
          "region": "American Bourbons",
          "suggested_bottle": "Blanton's Single Barrel"
        }
      ],
      "missing_age_segments": [
        {
          "age_group": "Over 20 years",
          "suggested_bottle": "Glenfiddich 21 Gran Reserva"
        }
      ]
    },
    "community_trends": {
      "popular_picks": [
        "Redbreast 12 Cask Strength",
        "Compass Box Hedonism"
      ],
      "hidden_gems": [
        "Kilkerran 12"
      ]
    },
    "pairings_and_occasions": [
      {
        "occasion": "Special Celebration",
        "recommended_bottle": "Glenfiddich 21"
      },
      {
        "food_pairing": "Blue cheese or smoked meats",
        "recommended_bottle": "Lagavulin 12"
      }
    ],
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
  },
  "summary": {
    "key_takeaways": [
      "Add a Japanese single malt to your collection",
      "Fill the American bourbon gap",
      "Prioritize investment buys like Springbank 15"
    ]
  }
}
```

## Technical Implementation

The system is built using NestJS, a progressive Node.js framework, with the following components:

- **Agent Controllers**: Handle API requests and coordinate multi-agent responses
- **Recommendation Services**: Process collection data and generate recommendations
- **BAXUS API Integration**: Connect to the BAXUS user bar endpoints
- **LLM Integration**: Leverage language models for specialized analysis

## Installation & Setup

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Access to the BAXUS API endpoint

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/baxus-bob.git
cd baxus-bob
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
```bash
cp .env.example .env
```
Then edit `.env` with your API keys and configuration.

### Running the Application

Development mode:
```bash
npm run start:dev
```

Production mode:
```bash
npm run build
npm run start:prod
```

### API Endpoint

- **GET /agent/recommend**: Get comprehensive whisky recommendations for a user

Request example 
```bash
{
  username: carriebaxus
}
```

## Testing

```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Test coverage
npm run test:cov
```

## Future Enhancements

- Integration with auction data for more accurate investment recommendations
- User feedback loop to improve recommendation accuracy over time
- Expanded food and occasion pairing database
- Flavor profile visualization tools
- Social sharing of recommendations

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- BAXUS for providing the API integration
- All whisky enthusiasts who provided feedback during development