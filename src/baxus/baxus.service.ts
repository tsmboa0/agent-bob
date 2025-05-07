import { Injectable } from '@nestjs/common';
import axios from 'axios';
import * as dotenv from 'dotenv';
import { getOrCreateBM25Index } from 'utils/helpers/buildBM25Index';
import { Bottle, BottleData, BottleSearchResult } from 'utils/types';

dotenv.config();

const BAXUS_END_POINT = "https://services.baxus.co/api/bar/user"


@Injectable()
export class BaxusService {
  private indexPromise: Promise<{ search: any; get: (id: string) => Bottle | undefined }>;
  private bottleCache: Map<string, Bottle> = new Map();

  constructor() {
    // Initialize the BM25 index
    this.indexPromise = getOrCreateBM25Index();
    console.log('Bottle Retrieval Tool initialized');
  }

  /**
   * Get user bar history from baxus API
   * @param username The search query string
   * @returns Array of user bottle collections
   */
  
  async  fetchUserData(username:string): Promise<BottleData[]> {
    try {
      // Use baxus endpoint to fetch data
      const response = await axios.get(`${BAXUS_END_POINT}/${username}`)

      const parsedResponse = response.data.map((data:any)=> data.product)

      return parsedResponse
    }catch{
      console.log("failed to fetch user")
      return null
    }
  }

   /**
   * Search for bottles that match the given query
   * @param query The search query string
   * @param limit Maximum number of results to return
   * @returns Array of bottles matching the query with similarity scores
   */
  async searchBottles(query: string, limit: number = 3): Promise<BottleSearchResult[]> {
    const index = await this.indexPromise;
    
    try {
      // Search returns an array of [id, score] pairs
      const searchResults = index.search(query, limit);
      
      // Map the search results to bottle data
      const bottles = await Promise.all(
        searchResults.map(async ([id, score]) => {
          const bottle = index.get(id);
          if (!bottle) return null;
          
          return {
            id: bottle.id,
            name: bottle.name,
            spirit_type: bottle.spirit_type,
            region: bottle.region,
            proof: bottle.proof,
            avg_msrp: bottle.avg_msrp,
            fair_price: bottle.fair_price,
            shelf_price: bottle.shelf_price,
            total_score: bottle.total_score,
            similarity: score
          };
        })
      );
      
      // Filter out any null results and sort by similarity
      return bottles.filter(Boolean) as BottleSearchResult[];
    } catch (error) {
      console.error('Error searching bottles:', error);
      return [];
    }
  }

  /**
   * Get a bottle by its ID
   * @param id The bottle ID
   * @returns The bottle data or null if not found
   */
    async getBottle(id: string): Promise<Bottle | null> {
      // Check cache first
      if (this.bottleCache.has(id)) {
        return this.bottleCache.get(id) || null;
      }
      
      const index = await this.indexPromise;
      const bottle = index.get(id);
      
      if (bottle) {
        this.bottleCache.set(id, bottle);
      }
      
      return bottle || null;
    }

  /**
   * Verify if a bottle exists in the dataset
   * @param bottleName The name of the bottle to verify
   * @returns Boolean indicating if the bottle exists and the bottle data if found
   */
  async verifyBottleExists(bottleName: string): Promise<{ exists: boolean; bottle?: Bottle }> {
    const results = await this.searchBottles(bottleName, 1);
    
    if (results.length === 0) {
      return { exists: false };
    }
    
    // Check if it's a close enough match (similarity > 0.7)
    const topMatch = results[0];
    if (topMatch.similarity < 0.7) {
      return { exists: false };
    }
    
    const bottle = await this.getBottle(topMatch.id);
    return {
      exists: true,
      bottle: bottle || undefined
    };
  }

}
