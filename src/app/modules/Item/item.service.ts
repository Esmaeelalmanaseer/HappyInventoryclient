import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ItemCreate, ItemParams, ItemUpdate } from '../../shared/Models/Item';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  baseurl: string = 'https://localhost:7296';
  constructor(private http: HttpClient) {}
  getAll(Item :ItemParams) {
    let params=new HttpParams();
    if(Item.sort)
    {
      params=params.append('sort',Item.sort)
    }
    if(Item.warehouseId)
    {
      params=params.append("warehouseId",Item.warehouseId)
    }
    params=params.append("PageNumber",Item.pageNumber)
    params=params.append("pageSize",Item.pageSize)
    return this.http.get(this.baseurl + '/api/Item/get-all-items',{params:params});
  }
  getByid(id: number) {
    return this.http.get(this.baseurl + '/api/Item/get-by-id/' + id);
  }
  aadd(item: ItemCreate) {
    return this.http.post(
      this.baseurl + '/api/Item/add-item',
      item
    );
  }
  Update(item: ItemUpdate) {
    return this.http.put(
      this.baseurl + '/api/Item/update-item',
      item
    );
  }
  Delete(id: number) {
    return this.http.delete(this.baseurl+'/api/Item/delete-item/'+id)
  }
}
