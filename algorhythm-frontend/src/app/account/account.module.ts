import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AccountRoutingModule } from './account.route';

import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { AccountAppComponent } from './account.app.component';
import { AccountService } from './services/account.service';
import { CustomFormsModule } from 'ngx-custom-validators';

import { AccountGuard } from './services/account.guard';
import { UserEditComponent } from './edit/edit.component';

@NgModule({
  declarations: [
    AccountAppComponent,
    RegisterComponent,
    LoginComponent,
    UserEditComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    AccountRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CustomFormsModule
  ],
  providers: [
    AccountService,
    AccountGuard
  ]
})
export class AccountModule { }
