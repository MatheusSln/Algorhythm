import { Injectable } from "@angular/core";
import { ActivatedRoute, ActivatedRouteSnapshot, Resolve } from "@angular/router";


@Injectable()
export class PerformResolve implements Resolve<number> {

    constructor() { }

    resolve(route: ActivatedRouteSnapshot) {
        return route.params['moduleId'];
    }
}