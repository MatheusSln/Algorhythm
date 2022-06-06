import { AfterViewInit, Component, ElementRef, OnInit, ViewChildren } from "@angular/core";
import { FormBuilder, FormControlName, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { CustomValidators } from '@narik/custom-validators';
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from "ngx-toastr";
import { fromEvent, merge, Observable } from "rxjs";
import { DisplayMessage, GenericValidator, ValidationMessages } from "src/app/utils/generic-form-validation";
import { LocalStorageUtils } from "src/app/utils/localstorage";
import { User } from "../models/user";
import { AccountService } from "../services/account.service";

@Component({
    selector: 'app-edit',
    templateUrl: './edit.component.html'
  })
export class UserEditComponent implements OnInit, AfterViewInit{

    @ViewChildren(FormControlName, {read: ElementRef}) formInputElements: ElementRef[];

    editForm: FormGroup;

    notSavedChanges: boolean;
    errors: any[] = [];
    token: string = "";
    user: any;
    userUpdate: User;
    email: string = "";
    name: string = "";
    birthDate: string = "";

    localStorageUtils = new LocalStorageUtils();
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

    ngOnInit(){
        this.token = this.localStorageUtils.getTokenUser();
        this.user = this.localStorageUtils.getUser()

        this.editForm = this.fb.group({
            email: ['', [Validators.required, Validators.email]],
            name: ['',[Validators.required, CustomValidators.rangeLength([2, 150])]],
            birthDate: ['', [Validators.required]]
          }); 

        if(this.user){
            this.fillForm(this.user)
        }
    }

    ngAfterViewInit(): void {
      let controlBlurs: Observable<any>[] = this.formInputElements
        .map((formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur'));
  
      merge(...controlBlurs).subscribe(() => {
        this.displayMessage = this.genericValidator.processMessages(this.editForm);
      });      
    }    

    fillForm(user: any){
        this.editForm.patchValue({
            name: this.user.name,
            email: this.user.email,
            birthDate: this.user.birthDate
        })
    }

    openModal(content){
        this.modalService.open(content);
      }

    updateAccount(){
        if (this.editForm.dirty && this.editForm.valid) {
            this.userUpdate = Object.assign({}, this.userUpdate, this.editForm.value);
            this.userUpdate.id = this.user.id;
            this.spinner.show();
            this.accountService.updateUser(this.userUpdate)          
                .subscribe(
                success => { this.proccessSuccess(success) },
                fail => { this.proccessFail(fail) }
              );
      
            this.notSavedChanges = false;
        }
    }

    proccessSuccess(response) {
        this.spinner.hide();
        this.editForm.reset();
        this.errors = [];
        this.accountService.LocalStorage.saveLocalDataUser(response);
        this.toastr.success('Conta atualizada com sucesso!', 'Sucesso!');
    
        this.router.navigate(['/home']);
      }
    
      proccessFail(fail: any) {
        this.spinner.hide();
        this.errors = fail.error.errors;
        this.toastr.error('Ocorreu um erro!', 'Opa :(');
      }    

    sendMailPassword(){
      this.spinner.show();
        this.accountService.sendResetPasswordEmail(this.user.email)
          .subscribe(
            () =>{
              this.spinner.hide();
              this.toastr.info("E-mail com instruções para troca de senha enviado", "E-mail enviado!");
              this.modalService.dismissAll();
            },
            fail =>{
              this.spinner.hide();
              this.errors = fail.error.errors;
              this.toastr.error('Ocorreu um erro!', 'Opa :(');
            }
          )
    }
}