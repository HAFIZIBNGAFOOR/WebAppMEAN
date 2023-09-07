import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminAuthModule } from './admin-auth.module';
import { FormsModule } from '@angular/forms';
import { AdminGuard } from './admin-auth.guard';
import { UserEditComponent } from './user-edit/user-edit.component';
import { AddUserComponent } from './add-user/add-user.component';

const adminAuthRoutes:Routes=[
  {path:'admin',component:AdminLoginComponent},
  {path:'admin/login',redirectTo:'admin',pathMatch:'full'},
  {path:'admin/dashboard',component:AdminDashboardComponent,canActivate:[AdminGuard]},
  {path:'admin/edit/:id',component:UserEditComponent,canActivate:[AdminGuard]},
  {path:'admin/addUser',component:AddUserComponent,canActivate:[AdminGuard]}

]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(adminAuthRoutes),
  ],
  exports:[
    RouterModule
  ]
})
export class AdminRoutingModule { }
