import { getEntries } from "./db";

export function detectAnomaly(entry){
  const nearby=getEntries().filter(e=>
    e.approved &&
    Math.abs(e.lat-entry.lat)<0.02 &&
    Math.abs(e.lng-entry.lng)<0.02
  );

  if(nearby.length<3) return "Not enough data";

  const avg=nearby.reduce((a,b)=>a+b.price,0)/nearby.length;
  const diff=Math.abs(entry.price-avg)/avg;

  if(diff>0.6) return "Highly Suspicious";
  if(diff>0.3) return "Unusual";
  return "Normal";
}
