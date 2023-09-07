export interface AuthState {
    isAuthenticated : boolean,
    signupSuccess:boolean,
    signupError : string | null,
    loginSuccess: boolean,
    loginError : string | null
    userData:UserData | null
}
export interface UserData{
    _id:string|null
    fullName:string,
    email:string,
    profilePic:string,
    isblock:boolean
}