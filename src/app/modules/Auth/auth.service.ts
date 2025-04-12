import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { user } from '../../shared/Models/user';
import { loginRequist } from '../../shared/Models/loginRequist';
import { loginresponse } from '../../shared/Models/loginresponse';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  $user=new BehaviorSubject<user | undefined>(undefined)
  constructor(private http:HttpClient) { }
  baseurl:string='https://localhost:7296'

  login(requist:loginRequist):Observable<loginresponse>
  {
    return this.http.post<loginresponse>(this.baseurl+'/api/Auth/LogIn',{email:requist.email,password:requist.password})
  }

  setUser(user:user):void
  {
    this.$user.next(user)
localStorage.setItem('user-email',user.email);
localStorage.setItem('roles',user.roles.join(','));

  }

  getUser():user | undefined
  {
    const email=localStorage.getItem('user-email');
    const roles=localStorage.getItem('roles');
    if(email&&roles)
    {
      const user:user={
        email:email,
        roles:roles?.split(',')
      }
     return user
    }
    return undefined
  }

  logout():void
  {
    localStorage.clear();
    this.$user.next(undefined);
  }
}
