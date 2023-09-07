import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { login } from '../store/auth.action';
import { NgForm } from '@angular/forms';
import { selectLoginError } from '../store/auth.selector';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  validationError:string ='';
  loginError : string | null =''
  loginCredential={
    email:'',
    password:''
  }
  constructor(private store:Store,private authService:AuthService,private router:Router){}
  ngOnInit(): void {
    console.log(this.authService.isLoggedIn(),' this is logged in function console');
    
   if( this.authService.isLoggedIn()){
    console.log('inside the loggged in in login component');
    this.router.navigate(['/home'])
   }
    this.store.select(selectLoginError).subscribe((loginError)=>{
      console.log(loginError,' this is inside the ngoninit login error message ');
      this.loginError = loginError
    })
  }

  onSubmit(form:NgForm):void{
    if(form.valid){
      this.validationError=''
      const {email, password} = this.loginCredential
      this.store.dispatch(login({email,password}))
    }else{
      this.validationError ='Please fill valid details'
    }
  }
}
