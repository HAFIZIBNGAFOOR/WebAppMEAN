import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './user-auth/login/login.component';
import { SignupComponent } from './user-auth/signup/signup.component';
import { UserHomeComponent } from './user-auth/user-home/user-home.component';
import { AuthRoutingModule } from './user-auth/auth-routing.module';
import { AuthModule } from './user-auth/auth.module';

const routes:Routes=[
  // {path:'',loadChildren:()=>AuthModule},
  {path:'',redirectTo:'login',pathMatch:'full'}
]
@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    // AuthRoutingModule,
  ],
  exports: [RouterModule]
})



export class AppRoutingModule {}
