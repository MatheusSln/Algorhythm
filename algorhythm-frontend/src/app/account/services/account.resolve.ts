import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve } from "@angular/router";
import { User } from "../models/user";
import { AccountService } from "./account.service";

@Injectable()
export class AccountResolve implements Resolve<User> {

    constructor(private accountService: AccountService) { }

    resolve(route: ActivatedRouteSnapshot) {
        return this.accountService.getById(route.params['id']);
    }
}