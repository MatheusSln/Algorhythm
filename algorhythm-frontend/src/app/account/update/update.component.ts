import { Component, ElementRef, OnInit, ViewChildren } from '@angular/core';
import {
  FormBuilder,
  FormControlName,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomValidators } from '@narik/custom-validators';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import {
  DisplayMessage,
  GenericValidator,
  ValidationMessages,
} from 'src/app/utils/generic-form-validation';
import { User } from '../models/user';
import { AccountService } from '../services/account.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
})
export class UserUpdateComponent implements OnInit {
  @ViewChildren(FormControlName, { read: ElementRef })
  formInputElements: ElementRef[];

  updateForm: FormGroup;

  notSavedChanges: boolean;
  errors: any[] = [];
  token: string = '';
  user: User;
  userUpdate: User;
  email: string = '';
  name: string = '';
  birthDate: string = '';

  validationMessage: ValidationMessages;
  genericValidator: GenericValidator;
  displayMessage: DisplayMessage = {};

  constructor(
    private fb: FormBuilder,
    private accountService: AccountService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private modalService: NgbModal,
    private spinner: NgxSpinnerService
  ) {
    this.validationMessage = {
      email: {
        required: 'Informe o e-mail',
        email: 'Email inválido',
      },
      name: {
        required: 'Informe seu nome',
        rangeLength: 'O nome precisa ter no mínimo 2 caracteres',
      },
      birthDate: {
        required: 'Informe sua data de nascimento',
      },
      password: {
        required: 'Informe a senha',
        rangeLength: 'A senha deve possuir entre 6 e 14 caracteres',
      },
      confirmPassword: {
        required: 'Informe a senha novamente',
        rangeLength: 'A senha deve possuir entre 6 e 14 caracteres',
        equalTo: 'As senhas não conferem',
      },
    };
    this.genericValidator = new GenericValidator(this.validationMessage);

    this.user = this.route.snapshot.data['user'];
  }

  ngOnInit() {
    this.spinner.show();
    this.updateForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      name: ['', [Validators.required, CustomValidators.rangeLength([2, 150])]],
      birthDate: ['', [Validators.required]],
    });

    if (this.user) {
      this.fillForm(this.user);
    }
    this.spinner.hide();
  }

  fillForm(user: any) {
    this.updateForm.patchValue({
      name: user.name,
      email: user.email,
      birthDate: user.birth,
    });
  }

  openModal(content) {
    this.modalService.open(content);
  }

  blockAccount() {
    this.modalService.dismissAll();

    if (this.updateForm.valid) {
      this.userUpdate = Object.assign(
        {},
        this.userUpdate,
        this.updateForm.value
      );
      this.userUpdate.id = this.user.id;

      this.accountService.blockUser(this.userUpdate).subscribe(
        () => {
          this.proccessSuccess('Conta bloqueada com sucesso');
        },
        (fail) => {
          this.proccessFail(fail);
        }
      );

      this.notSavedChanges = false;
    }
  }

  proccessSuccess(info: string) {
    this.updateForm.reset();
    this.errors = [];
    this.toastr.success(info, 'Sucesso!');

    this.router.navigate(['/account/list']);
  }

  proccessFail(fail: any) {
    this.errors = fail.error.errors;
    this.toastr.error('Ocorreu um erro!', 'Opa :(');
  }

  sendMailPassword() {
    if (this.updateForm.valid) {
      this.spinner.show();
      this.userUpdate = Object.assign(
        {},
        this.userUpdate,
        this.updateForm.value
      );
      this.spinner.show();
      this.userUpdate.id = this.user.id;

      this.accountService
        .sendResetPasswordEmail(this.userUpdate.email)
        .subscribe(
          () => {
            this.proccessSuccess('E-mail enviado com sucesso!'),
              this.spinner.hide();
          },
          (fail) => {
            this.proccessFail(fail),
            this.spinner.hide()
          }
        );

      this.notSavedChanges = false;
    }
  }

  editAccount() {
    if (this.updateForm.dirty && this.updateForm.valid) {
      this.userUpdate = Object.assign(
        {},
        this.userUpdate,
        this.updateForm.value
      );
      this.userUpdate.id = this.user.id;

      this.accountService.updateUser(this.userUpdate).subscribe(
        () => {
          this.proccessSuccess('Conta atualizada com sucesso');
        },
        (fail) => {
          this.proccessFail(fail);
        }
      );

      this.notSavedChanges = false;
    }
  }
}
