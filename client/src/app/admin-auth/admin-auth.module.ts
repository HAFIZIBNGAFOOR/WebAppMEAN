import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminAuthInterceptor } from '../shared/interceptors/admin-auth.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { UserEditComponent } from './user-edit/user-edit.component';
import { AddUserComponent } from './add-user/add-user.component';



@NgModule({
  providers:[
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AdminAuthInterceptor,
      multi: true, 
    },
  ],
  declarations: [
    AdminLoginComponent,
    AdminDashboardComponent,
    UserEditComponent,
    AddUserComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AdminAuthModule { }
