/* eslint-disable @typescript-eslint/no-unused-vars */
// src/types/product.ts
export type Product = {
  id: string;
  name: string;
  sku: string;
  quantity: number;
  unitType: string;
  purchasePrice: number;
  category: string;
  sellingPrice: number;
  suppliers: string[];
  status: string;
  description?: string; // Make this optional if not all products will have a description
  price: number; 
};
