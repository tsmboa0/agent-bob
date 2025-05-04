// src/helpers/buildBM25Index.ts
import fs from 'fs';
import path from 'path';
import csv from 'csv-parser';
import bm25 from 'wink-bm25-text-search';
import tokenizer from 'wink-tokenizer';

const rootPath = path.resolve(__dirname, '../../');
const csvPath = path.join(rootPath, 'data/metadata.csv');

type Bottle = {
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
  ranking: number,
}

const metadataPath = csvPath;

export async function buildBM25Index(): Promise<{ search: any, get: (id: string) => Bottle | undefined }> {
  // Create a new instance of the BM25 engine each time this function is called
  const engine = bm25();
  const tokenizerInstance = new tokenizer().tokenize;
  
  // Configure the engine
  engine.defineConfig({ fldWeights: { description: 1 } });
  engine.definePrepTasks([
    (text: string) => tokenizerInstance(text).map((t: any) => t.value.toLowerCase()),
  ]);
  
  // Create a collection to store all bottle data
  const bottles: Bottle[] = [];
  
  // First, collect all data from the CSV
  console.log('Reading CSV file...');
  await new Promise<void>((resolve, reject) => {
    fs.createReadStream(metadataPath)
      .pipe(csv())
      .on('data', (row) => {
        bottles.push({ ...row } as Bottle);
      })
      .on('end', () => {
        console.log(`Loaded ${bottles.length} bottles from CSV`);
        resolve();
      })
      .on('error', (err) => {
        console.error('Error reading CSV:', err);
        reject(err);
      });
  });
  
  // Then add all documents to the BM25 index
  console.log('Building BM25 index...');
  for (const bottle of bottles) {
    try {
      const description = `${bottle.name}, ${bottle.spirit_type}, ${bottle.proof} proof, MSRP $${bottle.avg_msrp}`;
      engine.addDoc({ description }, bottle.id);
    } catch (err) {
      console.error(`Error adding document for bottle ${bottle.id}:`, err);
      // Continue with other bottles instead of aborting everything
    }
  }
  
  // Only consolidate after all documents have been added
  console.log('Consolidating BM25 index...');
  engine.consolidate();
  console.log('BM25 index built successfully.');
  
  // Return the search function and bottle getter
  return {
    search: engine.search,
    get: (id: string) => bottles.find((b) => b.id === id),
  };
}

// Optional: Create a function to initialize the index just once
let indexPromise: Promise<{ search: any, get: (id: string) => Bottle | undefined }> | null = null;

export function getOrCreateBM25Index(): Promise<{ search: any, get: (id: string) => Bottle | undefined }> {
  if (!indexPromise) {
    indexPromise = buildBM25Index();
  }
  return indexPromise;
}