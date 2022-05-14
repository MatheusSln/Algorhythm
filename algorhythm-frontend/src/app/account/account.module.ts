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
import { UserListComponent } from './list/list.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { UserUpdateComponent } from './update/update.component';
import { AccountResolve } from './services/account.resolve';
import { ConfirmEmailResolve } from './services/confirmEmail.resolve';
import { RegisterConfirmComponent } from './registerConfirm/registerConfirm.component';
import { PasswordChangeComponent } from './passwordChange/passwordChange.component';
import { ChangePasswordResolve } from './services/changePassword.resolve';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AccountAppComponent,
    RegisterComponent,
    LoginComponent,
    UserEditComponent,
    UserListComponent,
    UserUpdateComponent,
    RegisterConfirmComponent,
    PasswordChangeComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    AccountRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CustomFormsModule,
    NgxSpinnerModule,
    NgbModule
  ],
  providers: [
    AccountService,
    AccountGuard,
    AccountResolve,
    ConfirmEmailResolve,
    ChangePasswordResolve
  ]
})
export class AccountModule { }
