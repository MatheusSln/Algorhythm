import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { MenuComponent } from "./menu/menu.component";
import { HomeComponent } from "./home/home.component";
import { FooterComponent } from "./footer/footer.component";
import { NotFoundComponent } from "./not-found/not-found.component";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { MenuLoginComponent } from "./menu-login/menu-login.component";
import { AccountService } from "../account/services/account.service";
import { HttpClientModule } from "@angular/common/http";
import { NgxSpinner, NgxSpinnerModule } from "ngx-spinner";

@NgModule({
    declarations: [
        MenuComponent,
        MenuLoginComponent,
        HomeComponent,
        FooterComponent,
        NotFoundComponent
    ],
    imports:[
        CommonModule,
        RouterModule,
        NgbModule,
        HttpClientModule,
        NgxSpinnerModule
    ],
    exports: [
        MenuComponent,
        MenuLoginComponent,
        HomeComponent,
        FooterComponent,
        NotFoundComponent        
    ],
    providers:[
        AccountService
    ]
})
export class NavigationModule{}