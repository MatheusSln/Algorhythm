import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AccountAppComponent } from "./account.app.component";
import { UserEditComponent } from "./edit/edit.component";
import { UserListComponent } from "./list/list.component";
import { LoginComponent } from "./login/login.component";
import { PasswordChangeComponent } from "./passwordChange/passwordChange.component";
import { RegisterComponent } from "./register/register.component";
import { RegisterConfirmComponent } from "./registerConfirm/registerConfirm.component";
import { AccountGuard } from "./services/account.guard";
import { AccountResolve } from "./services/account.resolve";
import { ChangePasswordResolve } from "./services/changePassword.resolve";
import { ConfirmEmailResolve } from "./services/confirmEmail.resolve";
import { UserUpdateComponent } from "./update/update.component";

const accountRouterConfig: Routes =  [
    {
        path: '', component: AccountAppComponent,
        children:[
            {path: 'register', component: RegisterComponent, canActivate: [AccountGuard], canDeactivate: [AccountGuard]},
            {path: 'login', component: LoginComponent},
            {path: 'edit', component: UserEditComponent},
            {path: 'list', component: UserListComponent},
            {path: 'update/:id', component: UserUpdateComponent, resolve: { user: AccountResolve}},
            {path: 'confirm/:token/:email', component: RegisterConfirmComponent, resolve: { bool: ConfirmEmailResolve}},
            {path: 'reset/:token/:email', component: PasswordChangeComponent, resolve: { params: ChangePasswordResolve}},
        ]
    }
]

@NgModule({
    imports: [
        RouterModule.forChild(accountRouterConfig)
    ],
    exports: [RouterModule]
})
export class AccountRoutingModule {}