import { Component, OnInit } from "@angular/core";
import { NgxSpinnerService } from "ngx-spinner";
import { User } from "../models/user";
import { AccountService } from "../services/account.service";

@Component({
    selector: 'app-list-user',
    templateUrl: './list.component.html'
  })
  export class UserListComponent implements OnInit {

    public users: User[];
    errorMessage: string;

    constructor(private accountService: AccountService, private spinner: NgxSpinnerService) { }

    ngOnInit(): void {
      this.spinner.show();
  
      this.accountService.getAll()
        .subscribe(
          users => {
            this.users = users,
            this.spinner.hide();
          },
          
          error =>{
            this.errorMessage = error,
            this.spinner.hide();
          } );
    }
}