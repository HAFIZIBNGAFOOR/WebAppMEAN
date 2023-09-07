import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AdminState } from "./admin.interface";

export const selectAdminState = createFeatureSelector<AdminState>('adminAuth');

export const selectAdminSignupError = createSelector(
    selectAdminState,
    (state:AdminState)=> state.loginError
)

export const selectIsloggedIn = createSelector(
    selectAdminState,
    (state:AdminState)=>state.isLoggedIn
)
export const userDetails = createSelector(
    selectAdminState,
    (state:AdminState)=> state.userDetails
)
export const toEditSelector = createSelector(
    selectAdminState,
    (state:AdminState)=>{  
        console.log(state,state.toEditUser,' this is insied the  to edit selector ');
        return state.toEditUser
    }
)
export const toeditSelectorSuccess = createSelector(
    selectAdminState,
    (state:AdminState)=>{
        console.log(state.success);
        return state.success  
    }
)
export const addNewUserErrorSelector = createSelector(
    selectAdminState,
    (state)=>{
        console.log(state.error,' this is inside the addnew user error selector');
        return state.error
    }
)
export const addNewUserSuccessSelector = createSelector(
    selectAdminState,
    (state)=>{
        console.log(state,'this is inside the addnew user success selector');
        return state.success
    }
)

