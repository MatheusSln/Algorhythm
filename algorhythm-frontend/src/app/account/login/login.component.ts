import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { FormBuilder, FormControl, FormControlName, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomValidators } from '@narik/custom-validators';
import { fromEvent, merge, Observable } from 'rxjs';

import { DisplayMessage, GenericValidator, ValidationMessages } from 'src/app/utils/generic-form-validation';
import { User } from '../models/user';
import { AccountService } from '../services/account.service';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  @ViewChildren(FormControlName, {read: ElementRef}) formInputElements: ElementRef[];

  errors: any[] = [];
  loginForm: FormGroup;
  resetPasswordForm: FormGroup;
  user: User;

  validationMessage: ValidationMessages;
  genericValidator: GenericValidator;
  displayMessage: DisplayMessage = {};

  constructor(private fb: FormBuilder,
              private accountService: AccountService,
              private router: Router,
              private toastr: ToastrService,
              private modalService: NgbModal,
              private spinner: NgxSpinnerService) {
                this.validationMessage= {
                  email: {
                    required: 'Informe o e-mail',
                    email: 'Email inválido'
                  },
                  password: {
                    required: 'Informe a senha',
                    rangeLength: 'A senha deve possuir entre 6 e 14 caracteres'
                  }
                };
                this.genericValidator = new GenericValidator(this.validationMessage);
              }
  
  ngOnInit(): void {

    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, CustomValidators.rangeLength([6, 14])]]
    });
  }

  ngAfterViewInit(): void {
    let controlBlurs: Observable<any>[] = this.formInputElements
      .map((formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur'));

    merge(...controlBlurs).subscribe(() => {
      this.displayMessage = this.genericValidator.processMessages(this.loginForm);
    });      
  }

  login() {
      if (this.loginForm.dirty && this.loginForm.valid) {
          this.spinner.show();

          this.user =  Object.assign({}, this.user, this.loginForm.value);

          this.accountService.login(this.user)
          .subscribe(
            success => {this.proccessSuccess(success)},
            fail => {this.proccessFail(fail)}
          );
      }
  }

  proccessSuccess(response : any){
      this.loginForm.reset();
      this.errors = [];
      this.accountService.LocalStorage.saveLocalDataUser(response);
      this.spinner.hide();
      this.toastr.success('', 'Bem vindo de volta!');

      location.assign('/home');
  }

  proccessSuccessResetPassword(){
    this.resetPasswordForm.reset();
    this.errors = [];
    this.modalService.dismissAll();
    this.spinner.hide();
    this.toastr.success('E-mail com instruções enviado com sucesso', 'Recuperação de senha');

    this.router.navigate(['/home']);
}

  proccessFail(fail : any){
      this.errors = fail.error.errors;
      this.spinner?.hide();
      this.modalService.dismissAll();
      this.toastr.error('Ocorreu um erro!', 'Opa :(');
  }

  openModal(content){

    this.resetPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });

    this.modalService.open(content);

    let controlBlurs: Observable<any>[] = this.formInputElements
    .map((formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur'));

  merge(...controlBlurs).subscribe(() => {
    this.displayMessage = this.genericValidator.processMessages(this.resetPasswordForm);
  });
  
  }

  sendPasswordReset(){
    if (this.resetPasswordForm.dirty && this.resetPasswordForm.valid) {
      this.spinner.show();
        this.accountService.sendResetPasswordEmail(this.resetPasswordForm.value.email)
        .subscribe(
          () => {this.proccessSuccessResetPassword()},
          fail => {this.proccessFail(fail)}
        );
    }
  }
}
