import { DecimalPipe } from '@angular/common';
import { Component, OnInit, PipeTransform } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { User } from '../models/user';
import { AccountService } from '../services/account.service';

@Component({
  selector: 'app-list-user',
  templateUrl: './list.component.html'
})
export class UserListComponent implements OnInit {
  public users: User[];
  errorMessage: string;

  filter = new FormControl('');

  users$: Observable<User[]>;

  constructor(
    private accountService: AccountService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.spinner.show();

    this.accountService.getAll().subscribe(
      (users) => {
        (this.users = users),
          this.spinner.hide(),
          (this.users$ = this.filter.valueChanges.pipe(
            startWith(''),
            map((text) => this.search(text))
          ));
      },

      (error) => {
        (this.errorMessage = error),
          this.spinner.hide(),
          this.toastr.error('Algo deu errado :/', 'Erro');
      }
    );
  }

  search(text: string): User[] {
    return this.users.filter((user) => {
      const term = text.toLowerCase();
      return (
        user.email.toLowerCase().includes(term) ||
        user.name.toLocaleLowerCase().includes(term)
      );
    });
  }
}
