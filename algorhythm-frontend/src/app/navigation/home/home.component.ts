import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Modules } from 'src/app/account/models/modules';
import { AccountService } from 'src/app/account/services/account.service';
import { Level } from 'src/app/utils/levelEnum';
import { LocalStorageUtils } from 'src/app/utils/localstorage';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  @ViewChild('content') modalContent: TemplateRef<any>;

  token: string = '';
  user: any;
  email: string = '';
  name: string = '';
  userLevel: Level;

  public modules: Modules[];

  localStorageUtils = new LocalStorageUtils();

  erroMessage: string;

  moduleToRestart: number;

  constructor(
    private router: Router,
    private accountService: AccountService,
    private toastr: ToastrService,
    private modalService: NgbModal,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.spinner.show();
    this.token = this.localStorageUtils.getTokenUser();
    this.user = this.localStorageUtils.getUser();

    if (this.user) {
      this.email = this.user.email;
      this.name = this.user.name;
      this.userLevel = this.user.claims.find(
        (element) => element.type == 'level'
      ).value;

      this.accountService.getModulesByUser(this.user.id).subscribe(
        (modules) => (this.modules = modules),
        () => this.proccessError(true)
      );
    }

    this.spinner.hide();
  }

  loggedUser(): boolean {
    return this.token !== null;
  }

  canAccess(level: number) {
    return !(this.userLevel >= level);
  }

  access(module: number) {
    let moduleFinished = this.modules.find(
      (element) => element.moduleId == module.toString()
    );

    if (moduleFinished.isFinished) {
      this.moduleToRestart = module;
      this.openModal(this.modalContent);
    } else {
      this.router.navigate(['/exercise/perform/' + module]);
    }
  }

  proccessError(loggoutUser: boolean) {
    if (loggoutUser) {
      this.localStorageUtils.cleanLocalDataUser();
    }

    const toast = this.toastr.error('Algo inesperado ocorreu :/', 'Erro');

    if (toast) {
      toast.onHidden.subscribe(() => {
        location.reload();
      });
    }
  }

  proccessSuccess(value) {
    this.modules = value.data;
  }

  openModal(content) {
    this.modalService.open(content);
  }

  restartModule() {
    if (this.moduleToRestart) {
      this.accountService
        .restartModuleByUser(this.moduleToRestart, this.user.id)
        .subscribe(
          () =>{
              this.router.navigate(['/exercise/perform/' + this.moduleToRestart]),
            this.modalService.dismissAll()
          },
          () => this.proccessError(false)
        );
    }
  }
}
