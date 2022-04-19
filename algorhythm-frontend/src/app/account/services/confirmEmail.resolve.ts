import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve } from "@angular/router";
import { AccountService } from "./account.service";


@Injectable()
export class ConfirmEmailResolve implements Resolve<boolean> {

    constructor(private accountService: AccountService) { }

    resolve(route: ActivatedRouteSnapshot) {
        return this.accountService.confirmEmail(route.params['token'], route.params['email']);
    }
}