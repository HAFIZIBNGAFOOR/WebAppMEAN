import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { AdminService } from "../services/admin.service";
import { UserDetails,  addNewUser,  addNewUserFailure,  addNewUserSuccess,  adminLogin, adminLoginFaiure, adminLoginSuccess, blockUnblockSuccess, blockUnblockUser, blockUnblockUserFailure, deleteUser, deleteUserFailed, deleteUserSuccess, editUser, editUserFailure, editUserSuccess } from "./admin-auth.action";
import { catchError, map, mergeMap, of, retry, switchMap } from "rxjs";
import { Router } from "@angular/router";
import { Token } from "./admin.interface";
import { UserData } from "src/app/user-auth/store/auth.interface";


@Injectable()

export class AdminAuthEffects{

    constructor(private actions$:Actions,private adminService : AdminService , private router: Router){}

    adminLogin$ = createEffect(()=>
        this.actions$.pipe(
            ofType(adminLogin),
            switchMap((action)=>{
                console.log('inside the loginAdmin effect >>>>' ,action);
                return this.adminService.adminLogin(action.email,action.password).pipe(
                    map((response:any)=>{
                        const token = response.token;
                        console.log(response,' this is response from admin login api after the success');
                        this.adminService.setAdminToken(token)
                        this.router.navigate(['/admin/dashboard'])
                        return adminLoginSuccess()
                    }),
                    catchError((error)=>{
                        const errorIs = error.error.message
                        console.log(error,' this is error from admin login after error response');
                       return [ adminLoginFaiure({errorIs})]
                    })
                )
            })
        )
    )
    deleteUser$ = createEffect(()=>
            this.actions$.pipe(
                ofType(deleteUser),
                switchMap((action)=>{
                   return this.adminService.deleteUser(action.userId).pipe(
                    map((res)=>{
                        console.log(res,' this is response from delete user api ');
                        return deleteUserSuccess({userId:action.userId})
                    }),
                    catchError((error)=>{
                        console.log(error);
                        return [deleteUserFailed({error:error.error.message})]
                    })
                   )
                   
                })
            )
    )

    blockUnblock$  = createEffect(()=>
            this.actions$.pipe(
                ofType(blockUnblockUser),
                switchMap((action)=>{
                    return this.adminService.blockUnblockUser(action.userId).pipe(
                        map((res:UserData[] | any)=>{
                            console.log(res,' this is res from blcok unblock api');
                            return blockUnblockSuccess({userDetails:res});
                        }),
                        catchError((error)=>{
                            console.log(error,' this is error from block unblcok effect ');
                            return [blockUnblockUserFailure({error:error.error.message})]
                            
                        })
                    )
                })
            )
    )

    editUser$ = createEffect(()=>
            this.actions$.pipe(
                ofType(editUser),
                switchMap((action)=>{
                    console.log(action,' this is action from effect of edit user');
                    
                    return this.adminService.editUser(action.id,action.userData).pipe(
                        map((user:UserData[] | any)=>{
                            console.log('this is effect of edit user and response from edit user api ',user);
                            return editUserSuccess({user:user})
                        }),
                        catchError((error)=>{
                            console.log(error,' this is error response from edit user api ');
                            return [editUserFailure({error:error})]
                        })
                    )
                })
            )
    )

    addNewUser$ = createEffect(
        ()=>
        this.actions$.pipe(
            ofType(addNewUser),
            switchMap((action)=>{
                console.log(action,'this is action in add user effect');
                
                return this.adminService.addNewUser(action.name,action.email,action.password).pipe(
                    map((userData:UserData[]| any)=>{
                        console.log('inisde the add new user effect success ',userData);
                        return addNewUserSuccess({userDetails:userData})
                    }),
                    catchError((error)=>{
                        console.log('inisde the add new user effect error ',error.error[0]);
                        return [addNewUserFailure({error:error.error[0]})]
                    })
                )
            })
        )
    ) 
    // userDetails$ = createEffect(()=>
    //     this.action$.pipe(
    //         ofType(UserDetails),
    //         switchMap((action)=>{
    //             console.log(' inside the userDetails effect ', action);
    //             return this.adminService.getUserDetails().pipe(
    //                 map((res)=>{
    //                     console.log(res,' <<<<<this is response from user Details api call ');
    //                     return UserDetailsSuccess()
    //                 }),
    //                 catchError((error)=>{
    //                     console.log(error ,' this is error from catch error of userDetails action ');
    //                     return[UserDetailsFailure({error})]
    //                 })
    //             )
                
    //         })
    //     )
    // )
}
