import { ChangeDetectorRef, Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { adminLogin } from '../store/admin-auth.action';
import { selectAdminSignupError } from '../store/admin-auth.selector';
import { AdminService } from '../services/admin.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent {
  serverError$ = this.store.pipe(select(selectAdminSignupError))
  
  validationError:string=''
  serverError : string | null=''
  adminData={
    email:'',
    password:''
  }
constructor(private store: Store,private router:Router, private adminService:AdminService){}

ngOnInit(): void {
  if(this.adminService.isLoggedIn()){
    this.router.navigate(['admin/dashboard'])
  }
}
// this.store.select(selectAdminSignupError).subscribe((error)=>{
//     console.log('this is selecting admin error selector error',error);
//     this.serverError = error
//     this.cd.detectChanges()
// })
  onSubmit(form:NgForm){
      if(form.valid){
        const body = this.adminData
        this.validationError=''
        this.store.dispatch(adminLogin(body))
        console.log(' dispatch successfull on submit  ',body,this.serverError$);
      }else {
        console.log(' validation error ');
        this.validationError = 'Please enter valid details'
      }
  }
}
