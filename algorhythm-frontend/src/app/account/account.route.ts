import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AccountAppComponent } from "./account.app.component";
import { UserEditComponent } from "./edit/edit.component";
import { UserListComponent } from "./list/list.component";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { AccountGuard } from "./services/account.guard";
import { AccountResolve } from "./services/account.resolve";
import { UserUpdateComponent } from "./update/update.component";

const accountRouterConfig: Routes =  [
    {
        path: '', component: AccountAppComponent,
        children:[
            {path: 'register', component: RegisterComponent, canActivate: [AccountGuard], canDeactivate: [AccountGuard]},
            {path: 'login', component: LoginComponent},
            {path: 'edit', component: UserEditComponent},
            {path: 'list', component: UserListComponent},
            {path: 'update/:id', component: UserUpdateComponent, resolve: { user: AccountResolve}}
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