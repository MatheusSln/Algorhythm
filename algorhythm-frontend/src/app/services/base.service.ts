import { HttpErrorResponse, HttpHeaders } from "@angular/common/http"
import { throwError } from "rxjs";
import { environment } from "src/environments/environment";
import { LocalStorageUtils } from "../utils/localstorage";

export abstract class BaseService{

    public LocalStorage = new LocalStorageUtils();

    protected UrlServiceV1: string = environment.apiUrl;

    protected GetHeaderJson() {
        return {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            })
        };
    }

    protected GetHeaderAuthJson() {
        return {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Authorization': `Bearer ${this.LocalStorage.getTokenUser()}`
            })
        };
    }

    protected extractData(response: any){
        return response.data || {};
    }

    protected serviceError(response: Response | any){
        let customError: string[] = [];

        if(response instanceof HttpErrorResponse) {

            if (response.statusText === "Unknown Error"){
                customError.push("Ocorreu um erro desconhecido");
                response.error.errors = customError;
            }
        }
        
        console.error(response);
        return throwError(response);
    }
}