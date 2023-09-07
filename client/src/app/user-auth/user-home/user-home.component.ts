import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Store, select } from '@ngrx/store';
import { AuthState, UserData } from '../store/auth.interface';
import { loginSuccess, userProfile } from '../store/auth.action';
import { Observable } from 'rxjs';
import { userData } from '../store/auth.selector';


@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.css']
})
export class UserHomeComponent {
  user$ = this.store.pipe(select(userData))

  
  constructor(private service : AuthService,private store:Store<{auth:AuthState}>){}

  ngOnInit(): void {
    console.log('inside ng oninit');
    this.service.getUserHome().subscribe(
      (res:any)=>{
        console.log(res.user,'this is response from userprofile api ',res);
        // this.user$= res.user
        this.store.dispatch(userProfile({userData:res.user}))
      },
      err=>{
        console.log(err.error.message,err.status,' this is token expired error ');
        
      }
    )
  }
}
