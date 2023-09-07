import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { UserHomeComponent } from './user-home/user-home.component';
import { FormsModule } from '@angular/forms';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  // {path:'',redirectTo:'login',pathMatch:'full'},
  {path:'login',component:LoginComponent},
  {path:'signup',component:SignupComponent},
  {path:'home',component:UserHomeComponent,canActivate:[AuthGuard]},
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    FormsModule,
  ],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
