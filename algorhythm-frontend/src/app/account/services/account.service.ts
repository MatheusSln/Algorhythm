import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map, catchError } from 'rxjs/operators';
import { BaseService } from "src/app/services/base.service";
import { User } from "../models/user";


@Injectable()
export class AccountService extends BaseService{
    constructor (private http: HttpClient){ super(); }

    registerUser(user: User) : Observable<User> {
        let response = this.http
            .post(this.UrlServiceV1 + 'nova-conta', user, this.GetHeaderJson())
            .pipe(
                map(this.extractData),
                catchError(this.serviceError));

        return response;
    }

    login(user : User) : Observable<User>{
        let response = this.http
            .post(this.UrlServiceV1 + 'entrar', user, this.GetHeaderJson())
            .pipe(
                map(this.extractData),
                catchError(this.serviceError));

        return response;        
    }
}