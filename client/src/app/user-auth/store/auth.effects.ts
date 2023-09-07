import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { AuthService } from "../services/auth.service";
import {duplicateEmail, login, loginFailure, loginSuccess, logout, signup, signupFailure, signupSuccess} from "./auth.action"
import { catchError, map, of, switchMap, tap } from "rxjs";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";

@Injectable()
export class AuthEffects{
    constructor(private action$:Actions,private authService:AuthService,private router:Router ,private store:Store){};

    // signup$ = createEffect(()=>
    //     this.action$.pipe(
    //         ofType(signup),
    //         switchMap(action=>{
    //             console.log('Signup action is reaching the effect:', action);
    //             return this.authService.signup(action.email, action.name, action.imageBase64, action.password).pipe(
    //                 map(() => {
    //                     console.log('Signup API call successful');
    //                     this.router.navigate(['/login']);
    //                     return signupSuccess(); 
    //                   }),
    //                 catchError(error =>{
    //                         if(error.status ==422){
    //                             console.log(' this is inside duplicate email error ',error.status);
    //                             return [duplicateEmail({message:'Entered email already exists'})]
    //                         }else{
    //                            return [ signupFailure({error:'An error occured during singup Try Again'})]
    //                         }

    //                     }
    //                 )
    //             )
    //         }
    //         ),
    //     )
    // );

    login$ = createEffect(()=>
        this.action$.pipe(
            ofType(login),
            switchMap((action)=>{
                console.log(' this is login action is reaching login effects >',action);
                 return this.authService.login(action.email,action.password).pipe(
                    map((response)=>{
                      const token = response.token
                      console.log('login post api successfull >>>>',response,'<<<<<<response,toke>>>>>>>>>>>>',token);
                      this.authService.setToken(token)
                      this.router.navigate(['/home'])
                      return loginSuccess()
                    }),
                    catchError(error => {
                        const errorMessage = error.error.message;
                        console.log(error, " login error in login effects ,and error status >> ",error.status,'     ',error.error.message);
                        return [loginFailure({errorMessage})]
                    })
                ) 
            })
        )
    )

    logout$ = createEffect(
        () =>
          this.action$.pipe(
            ofType(logout), // Listen for the logout action
            tap(() => {
              this.authService.logout();
            })
          ),
        { dispatch: false } // No additional actions will be dispatched from this effect
      );


}