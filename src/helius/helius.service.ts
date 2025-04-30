import { Injectable } from '@nestjs/common';
import { Connection, PublicKey } from '@solana/web3.js';
import axios from 'axios';
import * as fs from 'fs';
import * as dotenv from 'dotenv';
import { ParsedTransaction } from 'src/agent/agent.utils/types';

dotenv.config();

// Configuration - replace with your values or add them to a .env file
const HELIUS_API_KEY = process.env.HELIUS_API_KEY;
const HELIUS_RPC_URL = `https://mainnet.helius-rpc.com/?api-key=${HELIUS_API_KEY}`;

// Interface for transaction data
interface TransactionData {
  signature: string;
  timestamp: string;
  sender: string;
  recipient: string;
  amount: string;
  tokenSymbol: string;
}


@Injectable()
export class HeliusService {
  
  async  fetchTransactionHistory(address: string, limit: number = 200): Promise<TransactionData[]> {
    try {
      // Validate the address
      const pubKey = new PublicKey(address);
      console.log(`Fetching the last ${limit} transactions for ${pubKey.toString()}...`);
  
      // Use Helius enhanced API for better transaction data
      const response = await axios.post(HELIUS_RPC_URL, {
        jsonrpc: '2.0',
        id: 'helius-enhanced',
        method: 'getAddressHistory',
        params: [
          pubKey.toString(),
          {
            limit,
            before: '', // Leave empty to get the most recent transactions
          },
        ],
      });
  
      if (!response.data.result) {
        throw new Error('No transaction data received');
      }
  
      // Get transactions and strictly enforce the limit
      let transactions = response.data.result;
      
      // Ensure we don't process more than the requested limit
      if (transactions.length > limit) {
        console.log(`Found ${transactions.length} transactions, limiting to ${limit} as requested`);
        transactions = transactions.slice(0, limit);
      } else {
        console.log(`Found ${transactions.length} transactions`);
      }
  
      // Process the enriched transaction data
      // const parsedTransactions: ParsedTransaction[] = transactions.map((tx: any) => {
      //   let sender = '';
      //   let recipient = '';
      //   let amount = '0';
      //   let tokenSymbol = 'SOL';
      //   let type = 'Unknown';
  
      //   try {
      //     // Determine transaction type and extract relevant info
      //     if (tx.type === 'TRANSFER' || tx.type === 'SOL_TRANSFER') {
      //       type = 'Transfer';
      //       tokenSymbol = tx.tokenTransfers && tx.tokenTransfers[0]?.mint 
      //         ? tx.tokenTransfers[0].symbol || 'Unknown Token' 
      //         : 'SOL';
            
      //       // Extract sender and recipient
      //       if (tx.instructions && tx.instructions.length > 0) {
      //         // For SOL transfers
      //         if (tx.tokenTransfers && tx.tokenTransfers.length > 0) {
      //           const transfer = tx.tokenTransfers[0];
      //           sender = transfer.fromUserAccount || '';
      //           recipient = transfer.toUserAccount || '';
      //           amount = transfer.tokenAmount || '0';
      //         } else if (tx.nativeTransfers && tx.nativeTransfers.length > 0) {
      //           const transfer = tx.nativeTransfers[0];
      //           sender = transfer.fromUserAccount || '';
      //           recipient = transfer.toUserAccount || '';
      //           amount = (parseFloat(transfer.amount) / 1000000000).toString(); // Convert lamports to SOL
      //         }
      //       }
      //     } else if (tx.type === 'SWAP') {
      //       type = 'Swap';
      //       if (tx.tokenTransfers && tx.tokenTransfers.length >= 2) {
      //         sender = tx.tokenTransfers[0].fromUserAccount || '';
      //         recipient = tx.tokenTransfers[1].toUserAccount || '';
      //         amount = `${tx.tokenTransfers[0].tokenAmount} ${tx.tokenTransfers[0].symbol || 'Unknown'} → ${tx.tokenTransfers[1].tokenAmount} ${tx.tokenTransfers[1].symbol || 'Unknown'}`;
      //         tokenSymbol = '';
      //       }
      //     } else if (tx.type === 'NFT_SALE') {
      //       type = 'NFT Sale';
      //       if (tx.events && tx.events.nft && tx.events.nft.length > 0) {
      //         const nftEvent = tx.events.nft[0];
      //         sender = nftEvent.seller || '';
      //         recipient = nftEvent.buyer || '';
      //         amount = nftEvent.amount ? (parseFloat(nftEvent.amount) / 1000000000).toString() : '0';
      //         tokenSymbol = 'SOL (NFT Sale)';
      //       }
      //     } else {
      //       // Default case for other transaction types
      //       if (tx.feePayer) {
      //         sender = tx.feePayer;
      //       }
      //       if (tx.instructions && tx.instructions.length > 0 && tx.instructions[0].accounts && tx.instructions[0].accounts.length > 0) {
      //         recipient = tx.instructions[0].accounts[0];
      //       }
      //       type = tx.type || 'Unknown';
      //     }
      //   } catch (error) {
      //     console.error(`Error parsing transaction ${tx.signature}:`, error);
      //   }
  
      //   return {
      //     signature: tx.signature,
      //     timestamp: new Date(tx.timestamp * 1000).toISOString(),
      //     blockTime: tx.timestamp,
      //     sender,
      //     recipient,
      //     amount,
      //     tokenSymbol,
      //     success: tx.status === 'confirmed',
      //     type,
      //     fee: tx.fee ? (parseFloat(tx.fee) / 1000000000).toString() : '0',
      //   };
      // });
      // return parsedTransactions;

      return transactions
    } catch (error) {
      console.error('Error fetching transaction history:', error);
    }
  }

  async getTransactionDetails(txHash: string) {
    try{
      const response = await axios.post(HELIUS_RPC_URL, {
        jsonrpc: '2.0',
        id: 'helius-tx',
        method: 'getTransaction',
        params: [
          txHash,
          { encoding: 'jsonParsed', maxSupportedTransactionVersion: 0 }
        ],
      });
  
      if (!response.data.result) {
        console.log('Transaction not found');
        return null;
      }
  
      console.log('Successfully retrieved transaction data');
      // return parseStandardTransaction(response.data.result);
      return response.data?.result
    }catch (error) {
      console.error('Error fetching transaction:', error);
      return null;
    }
  } 
}
