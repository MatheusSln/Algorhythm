import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map, catchError } from 'rxjs/operators';
import { BaseService } from "src/app/services/base.service";
import { ChangePassword } from "../models/changePassword";
import { Modules } from "../models/modules";
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

    updateUser(user: User) : Observable<User>{
        let response = this.http
        .put(this.UrlServiceV1 + 'user', user, this.GetHeaderAuthJson())
        .pipe(
            map(this.extractData),
            catchError(this.serviceError));

    return response;  
    }

    blockUser(user: User) : Observable<User>{
        let response = this.http
        .put(this.UrlServiceV1 + 'user/block', user, this.GetHeaderAuthJson())
        .pipe(
            map(this.extractData),
            catchError(this.serviceError));

    return response;  
    }    

    getAll() : Observable<User[]>{
        return this.http
        .get<User[]>(this.UrlServiceV1 + "user", this.GetHeaderAuthJson())
        .pipe(catchError(super.serviceError));
    }

    getById(id: string): Observable<User> {
        return this.http
            .get<User>(this.UrlServiceV1 + "user/" + id, this.GetHeaderAuthJson())
            .pipe(catchError(super.serviceError));
    }

    confirmEmail(token: string, email: string){
        return this.http
            .get<boolean>(this.UrlServiceV1 + "user/confirm?token=" + token + "&email=" + email, this.GetHeaderJson())
            .pipe(catchError(super.serviceError));
    }

    sendResetPasswordEmail(email: string){
        let response = this.http
        .post(this.UrlServiceV1 + 'user/resetSend', "\""+email+"\"", this.GetHeaderJson())
        .pipe(
            map(this.extractData),
            catchError(this.serviceError));

    return response;  
    }

    resetPassword(changePassword: ChangePassword) : Observable<ChangePassword>{
        let response = this.http
        .post(this.UrlServiceV1 + 'user/changepassword', changePassword, this.GetHeaderJson())
        .pipe(
            map(this.extractData),
            catchError(this.serviceError));

    return response; 
    }

    getModulesByUser(userId: string) : Observable<Modules[]>{
        let response = this.http
        .get<Modules[]>(this.UrlServiceV1 + 'user/modules?userId=' + userId, this.GetHeaderAuthJson())
        .pipe(
            map(this.extractData),
            catchError(super.serviceError));

        return response;
    }

    restartModuleByUser(module: number, userId: string){
        let response = this.http
        .delete(this.UrlServiceV1 + 'user/restart?userId=' + userId + "&moduleId=" + module, this.GetHeaderAuthJson())
        .pipe(
            map(this.extractData),
            catchError(this.serviceError));

    return response;         
    }

    refreshToken(userEmail: string, userId: string){
        return this.http
            .get<any>(this.UrlServiceV1 + "refreshtoken?userEmail=" + userEmail + "&userId=" + userId, this.GetHeaderAuthJson())
            .pipe(
                map(this.extractData),
                catchError(super.serviceError)
            )
    }    
}