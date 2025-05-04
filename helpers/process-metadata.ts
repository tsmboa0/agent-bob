import * as fs from 'fs';

import Papa from 'papaparse';

import * as path from 'path';

const rootPath = path.resolve(__dirname, '../../');
const csvPath = path.join(rootPath, 'data/metadata.csv');

const csvFile = fs.readFileSync(csvPath, 'utf8');

const parsed = Papa.parse(csvFile, {
  header: true, // return objects instead of arrays
  skipEmptyLines: true,
});

const rawData = parsed.data as any[];

function cleanMetadata(records: any[]): any[] {
    return records.map((entry) => ({
      id: entry.id?.trim(),
      name: entry.name?.trim().replace(/\s+/g, ' '),
      abv: parseFloat(entry.abv) || null,
      image_url: entry.image_url?.trim(),
      region: entry.region?.trim() || 'Unknown',
      avg_msrp: parseFloat(entry.avg_msrp) || null,
      fair_price: parseFloat(entry.fair_price) || null,
      shelf_price: parseFloat(entry.shelf_price) || null,
      proof: entry.proof?.trim() || 'Unknown',
      brand_id: entry.brand_id?.trim() || 'Unknown',
      popularity: entry.popularity?.trim() || 'Unknown',
      size: entry.size?.trim() || 'Unknown',
      spirit_type: entry.spirit_type?.trim() || 'Unknown',
      total_score: entry.total_score?.trim() || 'Unknown',
      wishlist_count: entry.wishlist_count?.trim() || 'Unknown',
      vote_count: entry.vote_count?.trim() || 'Unknown',
      bar_count: entry.bar_count?.trim() || 'Unknown',
      ranking: entry.ranking?.trim() || 'Unknown',
    }));
  }
  
export const cleanedData = cleanMetadata(rawData);
  
