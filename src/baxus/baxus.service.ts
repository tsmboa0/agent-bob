import { Injectable } from '@nestjs/common';
import axios from 'axios';
import * as dotenv from 'dotenv';

dotenv.config();

const BAXUS_END_POINT = "https://services.baxus.co/api/bar/user"

// Interface for transaction data
interface BottleData {
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


@Injectable()
export class BaxusService {
  
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

}
