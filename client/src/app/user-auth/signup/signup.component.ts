import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Router } from '@angular/router';
import { signup } from '../store/auth.action';
import { NgForm } from '@angular/forms';
import { selectSingupError, selectSingupSuccess } from '../store/auth.selector';
import { AuthService } from '../services/auth.service';
interface userInter{
  name:string,
  email:string,
  selectedFile:File|null,
  password:string
}
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})

export class SignupComponent {
  // user = {
  //   name: '',
  //   email: '',
  //   image: '', 
  //   password: '',
  // };
  
  user:userInter={
   email :'',
  password :'',
  name:'',
  selectedFile : null
}

  validationError:string = "" 
  errorMessage : string | null = null;
  signupSuccess:boolean = false;

  constructor(private store:Store,private router:Router,private userService:AuthService){
    this.store.select(selectSingupError).subscribe((singupError)=>{
      console.log(singupError,'  <<this is signup error');
      this.validationError = '';
      this.errorMessage = singupError
    })
  }

  onImageChange(event: any): void {
    if (event.target.files.length > 0) {
      this.user.selectedFile = new File([event.target.files[0]], event.target.files[0].name);
    }
  }

  onSubmit(signUpForm:NgForm):void {
   if(signUpForm.valid){
    // if(this.user.selectedFile){
    //   const reader = new FileReader();
    //   reader.onload=(e:any)=>{
    //     const imageBase64 = e.target.result
    //     this.store.dispatch(signup({email:this.user.email,name:this.user.name,imageBase64,password:this.user.password}))

    //   }

    //   reader.readAsDataURL(file )
    // }
    
    // const {email,name,image,password } = this.user;

    // const file = this.user.selectedFile as Blob
    if(this.user.selectedFile){
      this.userService.signup(this.user.email,this.user.name,this.user.selectedFile,this.user.password).subscribe(
        (res)=>{
          this.signupSuccess=true
        },
        (err)=>{
          this.errorMessage=err.error
        }
        
        
      )
    // console.log('api call directly ');
    // }
   }
   else{
    console.log('else workedddd');
    this.validationError = 'Please enter valid Details';
   }
  }
 
  }
}
