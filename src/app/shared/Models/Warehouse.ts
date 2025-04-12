export interface WarehouseCreate {
    name: string
    address: string
    city: string
    country: string
  }

  export interface WarehouseUpdate {
    name: string
    address: string
    city: string
    country: string
    id: number
  }
  
  export interface WarehouseResponse {
    id: number
    name: string
    address: string
    city: string
    country: string
    itemCount: number
  }


  export class WarehouseParams {
    sort?: string;
    pageSize: number = 10;
    pageNumber: number = 1;
  }
  