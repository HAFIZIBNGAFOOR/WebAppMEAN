import { Component } from '@angular/core';
import { AdminService } from '../services/admin.service';
import { Store, select } from '@ngrx/store';
import { UserDetails, adminLogout, blockUnblockUser, deleteUser } from '../store/admin-auth.action';
import { userDetails } from '../store/admin-auth.selector';
import { UserData } from 'src/app/user-auth/store/auth.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent {
  userDetails$ = this.store.pipe(select(userDetails));
  usersDetails :UserData[]|null= []
  constructor(private adminService : AdminService,private store: Store,private router:Router){}

  ngOnInit(): void {
    
    this.adminService.getUserDetails().subscribe(
      (res:any)=>{
        return this.store.dispatch(UserDetails({userDetails:res}))
      },
    )
    this.store.pipe(select(userDetails)).subscribe((res:any)=>{
        // console.log(res,' this is response to check id ');
        this.usersDetails = res;
        // console.log(this.usersDetails,' this is userdetails');
        
    })
  }
  gotoEdit(id:string|null){
    if(id)this.router.navigate(['/admin/edit',id]) 
  }
  deteteUser(id:string | null){
    if (id) this.store.dispatch(deleteUser({userId:id}));   
  }
  blockUnblock(id:string | null){
    if(id) this.store.dispatch(blockUnblockUser({userId:id}))
    this.userDetails$ = this.store.pipe(select(userDetails));
  }
  addNewUser(){
    console.log('inside the add new user');
    this.router.navigate(['/admin/addUser'])
  }
  logout(){
    this.adminService.deleteToken();
    this.store.dispatch(adminLogout());
    console.log('token deleted ',this.adminService.deleteToken());
    this.router.navigate(['/admin/login'])
    
  }
}
