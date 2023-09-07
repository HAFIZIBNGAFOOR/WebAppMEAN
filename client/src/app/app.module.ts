import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './user-auth/auth.module';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AuthEffects } from './user-auth/store/auth.effects';
import { authReducer } from './user-auth/store/auth.reducer';
import { AdminAuthModule } from './admin-auth/admin-auth.module';
import { AdminAuthEffects } from './admin-auth/store/admin-auth.effects';
import { adminReducer } from './admin-auth/store/admin-auth.reducer';

@NgModule({
  declarations: [
    AppComponent,
    // AdminLoginComponent,
    // AdminDashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AuthModule,
    StoreModule.forRoot({auth:authReducer,adminAuth:adminReducer}),
    EffectsModule.forRoot([AuthEffects,AdminAuthEffects]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
    AdminAuthModule,
  ],
  providers: [
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
