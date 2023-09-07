import { createAction, createFeature, props } from "@ngrx/store";
import { UserData } from "../../user-auth/store/auth.interface";
import { NewUserData } from "./admin.interface";

export const adminLogin = createAction('[Admin] Login',props<{email:string,password:string}>())
export const adminLoginSuccess = createAction('[Admin] Login Success')
export const adminLoginFaiure = createAction('[Admin] Login Failure',props<{errorIs :string}>())
export const UserDetails = createAction('[Admin] User Details',props<{userDetails:UserData[]}>());
export const deleteUser = createAction('[Admin] Delete User',props<{userId:string}>());
export const deleteUserSuccess = createAction('[Admin] Delete User Success',props<{userId:string}>());
export const deleteUserFailed = createAction('[Admin] Delete User Success',props<{error:string}>());
export const blockUnblockUser = createAction('[Admin] Block Unblock User',props<{userId:string}>());
export const blockUnblockSuccess = createAction('[Admin] Block Unblock Success',props<{userDetails:UserData[]}>());
export const blockUnblockUserFailure = createAction('[Admin] Block Unblock Failure',props<{error:string}>());
export const getEditUser = createAction('[Admin] Edit User',props<{id:string}>());
export const editUser = createAction('[Admin] Edit User Api Call',props<{id:string,userData:UserData}>())
export const editUserSuccess = createAction('[Admin] Edit User Success',props<{user:UserData[]}>())
export const editUserFailure = createAction('[Admin] Edit User Failed ',props<{error:string}>());
export const addNewUser = createAction('[Admin] Add New User',props<{name:string,email:string,password:string}>());
export const addNewUserSuccess = createAction('[Admin] Add New User Success',props<{userDetails:UserData[]}>());
export const addNewUserFailure = createAction('[Admin] Add New User Failure',props<{error:string}>());
export const adminLogout = createAction('[Admin] Logout')