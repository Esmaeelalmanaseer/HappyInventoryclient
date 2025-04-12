import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import {
  WarehouseCreate,
  WarehouseParams,
  WarehouseUpdate,
} from '../../shared/Models/Warehouse';

@Injectable({
  providedIn: 'root',
})
export class WarehouseService {
  baseurl: string = 'https://localhost:7296';
  constructor(private http: HttpClient) {}

  getAll(Warehouse:WarehouseParams) {
    let params=new HttpParams();
    if(Warehouse.sort)
    {
      params=params.append('sort',Warehouse.sort)
    }
    params=params.append("PageNumber",Warehouse.pageNumber)
    params=params.append("pageSize",Warehouse.pageSize)
    return this.http.get(this.baseurl + '/api/Warehouse/get-all-Warehouse',{params:params});
  }
  getByid(id: number) {
    return this.http.get(this.baseurl + '/api/Warehouse/get-by-id/' + id);
  }
  aadd(Warehous: WarehouseCreate) {
    return this.http.post(
      this.baseurl + '/api/Warehouse/Add-Warehouse',
      Warehous
    );
  }
  Update(Warehous: WarehouseUpdate) {
    return this.http.put(
      this.baseurl + '/api/Warehouse/update-Warehouse',
      Warehous
    );
  }
  Delete(id: number) {
    return this.http.delete(this.baseurl+'/api/Warehouse/Delete-Warehouse/'+id)
  }
}
