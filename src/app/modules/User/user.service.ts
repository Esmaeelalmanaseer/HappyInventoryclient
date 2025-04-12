import { Injectable } from '@angular/core';
import { ChangePasswordDto, RegisterRequistDto, UpdateUserDto, UserDto } from '../../shared/Models/user';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = 'https://localhost:7296/api/Auth';

  constructor(private http: HttpClient) {}

  getAll(): Observable<UserDto[]> {
    return this.http.get<UserDto[]>(`${this.baseUrl}/get-all?addAuth=true`);
  }

  getById(id: string): Observable<UserDto> {
    return this.http.get<UserDto>(`${this.baseUrl}/get-by-id/${id}?addAuth=true`);
  }

  create(user: RegisterRequistDto): Observable<any> {
    return this.http.post(`${this.baseUrl}/create?addAuth=true`, user);
  }

  update(user: UpdateUserDto): Observable<any> {
    return this.http.put(`${this.baseUrl}/update?addAuth=true`, user);
  }

  delete(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/delete/${id}?addAuth=true`);
  }

  changePassword(dto: ChangePasswordDto): Observable<any> {
    return this.http.post(`${this.baseUrl}/change-password?addAuth=true`, dto);
  }
}
