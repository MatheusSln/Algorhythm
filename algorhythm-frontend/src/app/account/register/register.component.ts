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

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit, AfterViewInit {

  @ViewChildren(FormControlName, {read: ElementRef}) formInputElements: ElementRef[];

  errors: any[] = [];
  registerForm: FormGroup;
  user: User;

  notSavedChanges: boolean;

  validationMessage: ValidationMessages;
  genericValidator: GenericValidator;
  displayMessage: DisplayMessage = {};

  constructor(private fb: FormBuilder,
              private accountService: AccountService,
              private router: Router,
              private toastr: ToastrService,
              private modalService: NgbModal,) {
                this.validationMessage= {
                  email: {
                    required: 'Informe o e-mail',
                    email: 'E-mail inválido'
                  },
                  name: {
                    required: 'Informe seu nome',
                    rangeLength: 'O nome precisa ter no mínimo 2 caracteres'
                  },
                  birthDate: {
                    required: 'Informe sua data de nascimento',
                  },
                  password: {
                    required: 'Informe a senha',
                    rangeLength: 'A senha deve possuir entre 6 e 14 caracteres'
                  },                 
                  confirmPassword: {
                    required: 'Informe a senha novamente',
                    rangeLength: 'A senha deve possuir entre 6 e 14 caracteres',
                    equalTo: 'As senhas não conferem'
                  }
                };
                this.genericValidator = new GenericValidator(this.validationMessage);
              }
  
  ngOnInit(): void {

    let passw = new FormControl('', [Validators.required, CustomValidators.rangeLength([6, 15])]);
    let passwConfirm = new FormControl('', [Validators.required, CustomValidators.rangeLength([6, 15]), CustomValidators.equalTo(passw)]);

    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      name: ['',[Validators.required, CustomValidators.rangeLength([2, 150])]],
      birthDate: ['', [Validators.required]],
      password: passw,
      confirmPassword: passwConfirm
    }); 
  }

  ngAfterViewInit(): void {
    let controlBlurs: Observable<any>[] = this.formInputElements
      .map((formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur'));

    merge(...controlBlurs).subscribe(() => {
      this.displayMessage = this.genericValidator.processMessages(this.registerForm);
      this.notSavedChanges = true;
    });      
  }

  addAccount(content) {
      if (this.registerForm.dirty && this.registerForm.valid) {
          this.user =  Object.assign({}, this.user, this.registerForm.value);

          this.accountService.registerUser(this.user)
          .subscribe(
            () => {this.proccessSuccess(content)},
            fail => {this.proccessFail(fail)}
          );

          this.notSavedChanges = false;
      }
  }

  proccessSuccess(content: any){
      this.registerForm.reset();
      this.errors = [];

      this.toastr.success('Registro realizado com sucesso!', 'Bem vindo!');
      this.openModal(content);
      setTimeout(()=> {
        this.router.navigate(['/home']);
      }, 5000);      
  }

  proccessFail(fail : any){
      this.errors = fail.error.errors;
      this.toastr.error('Ocorreu um erro!', 'Opa :(');
  }

  openModal(content){
    this.modalService.open(content);
  }
}
