export interface ItemCreate {
    name: string
    sku: string
    quantity: number
    costPrice: number
    sellingPrice: number
    warehouseId: number
  }

  export interface ItemUpdate {
    name: string
    sku: string
    quantity: number
    costPrice: number
    sellingPrice: number
    warehouseId: number
    id: number
  }
  
  export interface ItemResponse {
    id: number
    name: string
    skuCode: any
    qty: number
    costPrice: number
    msrpPrice: any
    profitMargin: any
    warehouseId: number
    warehouseName: any
    warehouseLocation: any
    lastUpdated: any
    createdAt: string
  }

  export class ItemParams {
    sort?: string;
    warehouseId?:number
    pageSize: number = 10;
    pageNumber: number = 1;
  }
  