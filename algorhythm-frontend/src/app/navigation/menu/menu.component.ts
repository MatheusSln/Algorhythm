import { Component, OnInit } from "@angular/core";
import { LocalStorageUtils } from "src/app/utils/localstorage";

@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html'
})
export class MenuComponent implements OnInit {
    public isCollapsed: boolean;

    localStorageUtils = new LocalStorageUtils();
    user: any;
    isAdmin : boolean = false;

    constructor() {
      this.isCollapsed = true;
    }

    ngOnInit(): void {
       this.user = this.localStorageUtils.getUser();

       if (this.user && this.user.claims.find(
        (element) => element.type == 'Admin'
      ).value == "Admin"){
        this.isAdmin = true;
       }
    }
}