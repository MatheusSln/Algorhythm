import { Injectable } from "@angular/core";
import { CanActivate, CanDeactivate, Router} from "@angular/router";
import { Observable } from "rxjs";
import { LocalStorageUtils } from "src/app/utils/localstorage";
import { RegisterComponent } from "../register/register.component";

@Injectable()
export class AccountGuard implements CanDeactivate<RegisterComponent>, CanActivate{
    
    localStorageUtils = new LocalStorageUtils();

    constructor(private router: Router){}

    canDeactivate(component: RegisterComponent){
        
        if(component.notSavedChanges) {
            return window.confirm('Tem certeza que deseja abandonar o preenchimento do formulario?');
        }
        
        return true;
    }

    canActivate() {
        if(this.localStorageUtils.getTokenUser()){
            this.router.navigate(['/home']);
        }

        return true;
    }

}