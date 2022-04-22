import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve } from "@angular/router";

@Injectable()
export class ChangePasswordResolve implements Resolve<any> {

    params: any;

    constructor() { }

    resolve(route: ActivatedRouteSnapshot) {
        return this.params = {
            token: route.params['token'],
            email: route.params['email'],
        }
    }
}