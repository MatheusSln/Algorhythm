import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AccountRoutingModule } from './account.route';

import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { AccountAppComponent } from './account.app.component';

@NgModule({
  declarations: [
    AccountAppComponent,
    RegisterComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    AccountRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ]
})
export class AccountModule { }
