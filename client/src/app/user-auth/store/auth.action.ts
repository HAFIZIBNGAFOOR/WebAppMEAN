import { createAction,props } from "@ngrx/store";
import { UserData } from "./auth.interface";



    export const signup = createAction('[SignUp] Signup',props<{email:string,name:string,imageBase64:string ,password:string}>())
    export const signupSuccess = createAction('[SignUp] Signup Success');
    export const duplicateEmail = createAction('[Signup] Duplicate Email',props<{message:string}>())
    export const signupFailure = createAction('[SignUp] Signup Failure',props<{error:any}>());
    
    export const login = createAction('[Login] Login',props<{email:string, password:string}>());
    export const loginSuccess = createAction('[Login] Login Success');
    export const loginFailure = createAction('[Login] Login Failure',props<{errorMessage:any}>());
    export const userProfile = createAction('[Auth] User Profile',props<{userData:UserData}>())
    export const logout = createAction('[Auth] Token Expired');
