import { createReducer, on } from '@ngrx/store';
import * as AuthActions from './auth.action';
import { AuthState } from './auth.interface';


const initialState : AuthState ={
    isAuthenticated:false,
    signupSuccess:false,
    signupError:null,
    loginSuccess:false,
    loginError:null,
    userData:null
}

export const authReducer = createReducer(
    initialState,
    on(AuthActions.signupSuccess,state =>({...state ,signupSuccess:true, signupError:null})),
    on(AuthActions.duplicateEmail,(state,{message})=>({...state ,signupError:message})),
    on(AuthActions.signupFailure,(state,{error})=>({...state,signupError:error})),
    on(AuthActions.loginSuccess,(state)=>({...state,isAuthenticated:true,loginSuccess:true,loginError:null,})),
    on(AuthActions.loginFailure,(state,{errorMessage})=>({...state,isAuthenticated:false,loginError:errorMessage})),
    on(AuthActions.userProfile,(state,{userData})=>({...state , userData:userData})),
    on(AuthActions.logout, (state) => ({...state,isAuthenticated: false})),
)

export { AuthState };
