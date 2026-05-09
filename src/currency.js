const rates={INR:1,USD:83,EUR:90};

export const toINR=(price,currency)=>price*rates[currency];
export const fromINR=(price,currency)=>price/rates[currency];
