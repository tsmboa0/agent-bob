import { buildBM25Index } from './buildBM25Index';

//Function to generate description from bottle metadata
function formatBarProduct(p: any): string {
  return `${p.name}, ${p.spirit}, ${p.proof} proof, MSRP $${p.average_msrp}`;
}
 // Function to normalize search result from bm25
 function normalizeBM25Result(rawArray: string[]): { id: string; score: number }[] {
  return rawArray.map((entry) => {
    const [id, score] = entry.split(','); // split the "id,score" string
    return {
      id: id.trim(),
      score: parseFloat(score)
    };
  });
}



export async function searchRelevantBottlesFromBar(bar:any) {
  console.log("the user's data is:\n" + bar[0].name);
  const { search, get } = await buildBM25Index();

  const barDescriptions = bar.map((item:any) => formatBarProduct(item));

  // const allMatches = barDescriptions.flatMap((desc: string) => {
  //   console.log(`The description is: ${desc}`);
  
  //   const rawResults = search(desc, 5); // this returns a flat array
  // //   console.log(`rawresult is: ${rawResults}`)
  //   const results = normalizeBM25Result(rawResults); // 👈 fix here
  
  //   console.log(`Parsed BM25 results:\n${JSON.stringify(results, null, 2)}`);
  
  //   return results
  //     .map((r: any) => {
  //       const bottle = get(r.id);
  //       return bottle ? { ...bottle, score: r.score } : null;
  //     })
  //     .filter((b: any) => b !== null);
  // });

  // const uniqueMatches = Object.values(
  //   allMatches.reduce((acc:any, b:any) => {
  //     if (!acc[b.id]) acc[b.id] = b;
  //     return acc;
  //   }, {} as Record<string, any>)
  // );

  // console.log(`all matches are: ${allMatches}`)

  // return uniqueMatches;
}
