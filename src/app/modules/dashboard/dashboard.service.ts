import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { WarehouseStatusDto } from '../../shared/Models/Warehouse';
import { Observable } from 'rxjs';
import { ItemStatDto } from '../../shared/Models/Item';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private baseUrl = 'https://localhost:7296/api/Dashboard';

  constructor(private http: HttpClient) {}

  getWarehouseStatus(): Observable<WarehouseStatusDto[]> {
    return this.http.get<WarehouseStatusDto[]>(`${this.baseUrl}/warehouse-status?addAuth=true`);
  }
  
  getTopHighItems(): Observable<ItemStatDto[]> {
    return this.http.get<ItemStatDto[]>(`${this.baseUrl}/top-high?addAuth=true`);
  }
  
  getTopLowItems(): Observable<ItemStatDto[]> {
    return this.http.get<ItemStatDto[]>(`${this.baseUrl}/top-low?addAuth=true`);
  }
}