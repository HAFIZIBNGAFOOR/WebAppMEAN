import { UserData } from "../../user-auth/store/auth.interface";
import { AdminState } from "./admin.interface";

export const adminState:AdminState = {
    isLoggedIn:false,
    adminData:null,
    loginError: null,
    userDetails:null,
    toEditUser:null,
    error:null,
    success:false
}