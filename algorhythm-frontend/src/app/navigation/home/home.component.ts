import { Component, OnInit } from "@angular/core";
import { Level } from "src/app/utils/levelEnum";
import { LocalStorageUtils } from "src/app/utils/localstorage";

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit{

    token: string = "";
    user: any;
    email: string = "";
    name: string = "";
    userLevel: Level;
    
    localStorageUtils = new LocalStorageUtils();

    ngOnInit(): void {
        this.token = this.localStorageUtils.getTokenUser();
        this.user = this.localStorageUtils.getUser();
    
        if (this.user){
          this.email = this.user.email;
          this.name = this.user.name;
          this.userLevel = this.user.claims.find((element) => element.type == 'level').value;
        }        
    }

    loggedUser(): boolean {
    
        return this.token !== null;
    }

    canAccess(level: number){
        return !(this.userLevel >= level);
    }
}