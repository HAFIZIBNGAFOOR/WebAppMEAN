import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, retry } from 'rxjs';
import { environment } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  url=environment.userApi
  noAuthHeader = {headers: new HttpHeaders({'NoAuth':'True'})};

  constructor(private http:HttpClient) { }
  signup(email:string,name:string,image:File,password:string):Observable<any>{
    const formData = new FormData();
    formData.append('email',email)
    formData.append('name',name)
    formData.append('image',image)
    formData.append('password',password)
    return this.http.post(`${this.url}/api/register`,formData,this.noAuthHeader)
  }
  login(email:string,password:string):Observable <any> {
    console.log('inside the login api service');
    const body = { email,password}
    return this.http.post(`${this.url}/api/authenticate`,body,this.noAuthHeader)
  }
  logout(){
    localStorage.removeItem('token');
  }
  getUserHome(){
    return this.http.get(`${this.url}/api/usserprofile`)
  }

  setToken(token:string){
    console.log('token setting success ' );
    localStorage.setItem('token',token)
  }
  getToken(){
    console.log(localStorage.getItem('token'),' this is inside the get token ');
    return localStorage.getItem('token')
  }
  // deleteToken(){

  // }
  getPayload(){
    let token= this.getToken();
    console.log('this is user token inside payload ',token);
    if(token){
      let userPayload = atob(token.split('.')[1])
      console.log('this is user payload ',userPayload);
      return JSON.parse(userPayload)
    }else return null
  }

  isLoggedIn():boolean{
    let userPayload = this.getPayload();
    console.log(userPayload,' this is inside the isLogged in function');
    if(userPayload){
      return userPayload.exp > Date.now()/1000;
    }else return false
  }
}
