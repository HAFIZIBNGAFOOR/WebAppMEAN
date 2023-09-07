import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { editUser, getEditUser } from '../store/admin-auth.action';
import { ActivatedRoute, Router } from '@angular/router';
import { toEditSelector, toeditSelectorSuccess } from '../store/admin-auth.selector';
import { UserData } from 'src/app/user-auth/store/auth.interface';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { AdminService } from '../services/admin.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent {
  // editUser$ = this.store.select(toEditSelector);
  editUserSuccess$ = this.store.select(toeditSelectorSuccess);
  userForm! : FormGroup
  toEditUser:UserData| null = null
  validtionError:string =''
  userId:string =''
  userData={
    name:'',
    email:''
  }
  constructor(private store:Store,private route :ActivatedRoute, private formBuilder:FormBuilder,private adminService:AdminService,private router:Router){
  }
  ngOnInit(): void {
    this.userForm= this.formBuilder.group({
      email:['',[Validators.required, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$')]],
      fullName:['',[Validators.required,Validators.minLength(4),Validators.maxLength(16)]]
    }) 
    this.route.params.subscribe((params)=>{
        this.userId = params['id']
        console.log(this.userId,' this is user id ');
        if(this.userId) this.store.dispatch(getEditUser({id:this.userId}))
        this.store.select(toEditSelector).subscribe((res)=>{
          if(res){
            this.toEditUser = res
            this.userForm.patchValue(res)
          }
        })
    })

  }
  onSubmit(){
    if(this.userForm.valid){
      const updatedUser = this.userForm.value
      this.store.dispatch(editUser({id:this.userId,userData:updatedUser}))
      console.log('dispatched edituser',updatedUser, this.userId);
      // this.store.select()
      this.router.navigate(['/admin/dashboard'])
    }
  }
}