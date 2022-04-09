import { Component } from "@angular/core";
import { LocalStorageUtils } from "src/app/utils/localstorage";

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html'
})
export class HomeComponent {

    token: string = "";
    user: any;
    email: string = "";
    name: string = "";

    localStorageUtils = new LocalStorageUtils();

    
}