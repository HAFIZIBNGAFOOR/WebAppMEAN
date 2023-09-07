import { UserData } from "../../user-auth/store/auth.interface"

export interface adminCredentials{
    email:string,
    password:string
}
export interface AdminData{
    email:string,
}
export interface AdminState{
    isLoggedIn:boolean,
    adminData:AdminData | null,
    loginError:string | null,
    userDetails:UserData[] | null,
    toEditUser:UserData | null,
    error:string | null,
    success:boolean | null
}
export interface NewUserData {
    name: string;
    email: string;
    password: string;
  }
export interface Token{
    token:''
}