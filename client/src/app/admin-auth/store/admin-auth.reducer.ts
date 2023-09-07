import { createReducer, on } from "@ngrx/store";
import { adminState } from "./admin-auth.state";
import * as AdminAuthActions  from "./admin-auth.action";


export const adminReducer = createReducer(
    adminState,
    on(AdminAuthActions.adminLoginSuccess,(state)=>({...state,isLoggedIn : true})),
    on(AdminAuthActions.adminLoginFaiure,(state,{errorIs})=>({...state,loginError:errorIs})),
    on(AdminAuthActions.UserDetails,(state,{userDetails})=>({...state,userDetails : userDetails,isLoggedIn:true })),
    on(AdminAuthActions.deleteUserSuccess,(state,{userId})=>({
        ...state,
        userDetails:state.userDetails?.filter(user=>user._id !== userId)||null,isLoggedIn:true
    })),
    on(AdminAuthActions.blockUnblockSuccess,(state,{userDetails})=>({
        ...state,
        userDetails:userDetails
    })),
    on(AdminAuthActions.getEditUser,(state,{id})=>({
        ...state,
        toEditUser:state.userDetails?.find((user)=>user._id === id)|| null,
        isLoggedIn:true,
        userDetails:state.userDetails
    })),
    on(AdminAuthActions.editUserSuccess,(state,{user})=>({
        ...state,
        userDetails:user,
        success:true,
        isLoggedIn:true,
    })),
    on(AdminAuthActions.editUserFailure,(state,{error})=>({
        ...state,
        error:error,
        success:false,
        isLoggedIn:true
    })),
    on(AdminAuthActions.addNewUserSuccess,(state,{userDetails})=>({
        ...state,
        userDetails:userDetails,
        isLoggedIn:true,
        success:true,
        error:''
    })),
    on(AdminAuthActions.addNewUserFailure,(state,{error})=>({
        ...state,
        error:error,
        success:false
    })),
    on(AdminAuthActions.adminLogout,(state)=>({
        ...state,
        isLoggedIn:false,
        error:'',
        success:false,
        userDetails:null
    }))

)