import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { addNewUser } from '../store/admin-auth.action';
import { addNewUserErrorSelector, addNewUserSuccessSelector } from '../store/admin-auth.selector';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent {
  validationError:string='';
  serverSuccess$= this.store.select(addNewUserSuccessSelector)
  serverError$= this.store.select(addNewUserErrorSelector)

  userData={
    name:'',
    email:'',
    password:''
  }
  constructor(private store:Store){}
  onsubmit(form:NgForm){
    if(form.valid){
      this.store.dispatch(addNewUser(this.userData)) 
      console.log('dispatched add new user');
      
    }else{
      this.validationError = 'Enter valid details'
    }
  }

}
