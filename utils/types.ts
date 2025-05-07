export interface BottleData {
  product: {
    id: number,
    name: string,
    image_url: string,
    brand_id: number,
    brand: string,
    spirit: string,
    size: string,
    proof: number,
    average_msrp: number,
    fair_price: number,
    shelf_price: number,
    popularity: number,
    created: number,
    updated: number,
    barcode: string,
    barrel_pick: boolean,
    user_added_id: number,
    submitter_email: string,
    submitter_username: string,
    private: boolean,
    verified_date: number,
    user_added: boolean
  }
}

export type Bottle = {
    id: string,
    name: string,
    abv: string,
    image_url: string,
    region: string,
    avg_msrp: number,
    fair_price: number,
    shelf_price: number,
    proof: string,
    brand_id: string,
    popularity: number,
    size: number,
    spirit_type: string,
    total_score: number,
    wishlist_count: number,
    vote_count: number,
    bar_count: number,
    ranking?: number,
  }

  export interface BottleSearchResult {
    id: string;
    name: string;
    spirit_type: string;
    region: string;
    proof: string;
    avg_msrp: number;
    total_score: number;
    fair_price:number;
    shelf_price:number;
    similarity: number;
  }