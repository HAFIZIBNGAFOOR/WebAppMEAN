import { Injectable } from '@angular/core';
import { adminCredentials } from '../store/admin.interface';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  noAuthHeader = {headers: new HttpHeaders({'NoAuth':'True'})};
  url = environment.adminApi
  constructor(private http:HttpClient) { }

  adminLogin(email:string,password:string){
    console.log('inside the admin login service ',email , password);
    return this.http.post(`${this.url}/login`,{email,password},this.noAuthHeader);
  }
  editUser(id:string,userData:any,){
    console.log('inside the edit user service',id,userData);
    
    return this.http.put(`${this.url}/editUser/${id}`,userData)
  }
  getUserDetails(){
    console.log(' inside the get userlist service ');
    return this.http.get(`${this.url}/userList`);
  }
  deleteUser(id:string){
    console.log('inside the delete user ',id);
    return this.http.post(`${this.url}/deleteUser/${id}`,{})
  }
  addNewUser(name:string,email:string,password:string){
    const body ={name,email,password}
    return this.http.post(`${this.url}/addUser`,body)
  }
  blockUnblockUser(id:string){
    console.log(id,' this is id for blcokunbblock user');   
    return this.http.post(`${this.url}/blockUnblock/${id}`,{})
  }
  setAdminToken (token:string){
    localStorage.setItem('adminToken',token);
  }
  getAdminToken(){
    return localStorage.getItem('adminToken');
  }
  deleteToken(){
    return localStorage.removeItem('adminToken');
  }
  getPayload(){
    let token= this.getAdminToken();
    console.log('this is admin token inside payload ',token);
    if(token){
      let userPayload = atob(token.split('.')[1])
      console.log('this is admin payload ',userPayload);
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
