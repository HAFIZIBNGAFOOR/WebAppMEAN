import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AuthState } from "./auth.reducer";

export const selectAuthState = createFeatureSelector<AuthState>('auth');

export const selectSingupSuccess = createSelector(
    selectAuthState,
    (state:AuthState)=>state.signupSuccess
)
export const selectSingupError = createSelector(
    selectAuthState,
    (state:AuthState)=>state.signupError
)
export const selectLoginSuccess  = createSelector(
    selectAuthState,
    (state:AuthState)=>state.loginSuccess
);
export const selectLoginError = createSelector(
    selectAuthState,
    (state:AuthState)=>state.loginError
)
export const userData = createSelector(
    selectAuthState,
    (state:AuthState)=>state.userData
)