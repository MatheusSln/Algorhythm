import { AfterViewInit, Component, ElementRef, OnInit, ViewChildren } from "@angular/core";
import { FormBuilder, FormControl, FormControlName, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { CustomValidators } from "@narik/custom-validators";
import { ToastrService } from "ngx-toastr";
import { fromEvent, merge, Observable } from "rxjs";
import { DisplayMessage, GenericValidator, ValidationMessages } from "src/app/utils/generic-form-validation";
import { ChangePassword } from "../models/changePassword";
import { AccountService } from "../services/account.service";

@Component({
    selector: 'app-passwordChange',
    templateUrl: './passwordChange.component.html'
  })
export class PasswordChangeComponent implements OnInit, AfterViewInit {

    @ViewChildren(FormControlName, {read: ElementRef}) formInputElements: ElementRef[];

    errors: any[] = [];
    changePasswordForm: FormGroup;

    changePasswordModel: ChangePassword;
    params: any;
    token : string;
    email : string;

    notSavedChanges: boolean;

    validationMessage: ValidationMessages;
    genericValidator: GenericValidator;
    displayMessage: DisplayMessage = {};
    
    constructor(private route: ActivatedRoute,
                private router: Router, private fb: FormBuilder,
                private accountService: AccountService,
                private toastr: ToastrService) {

        this.params = route.snapshot.data["params"];
        this.token = this.params.token;
        this.email = this.params.email;

        this.validationMessage= {
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

        this.changePasswordForm = this.fb.group({
            password: passw,
            confirmPassword: passwConfirm
          });        
    }

    ngAfterViewInit(): void {
        let controlBlurs: Observable<any>[] = this.formInputElements
          .map((formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur'));
    
        merge(...controlBlurs).subscribe(() => {
          this.displayMessage = this.genericValidator.processMessages(this.changePasswordForm);
          this.notSavedChanges = true;
        });      
    }
    
    changePassword(){
        if (this.changePasswordForm.dirty && this.changePasswordForm.valid) {
            this.changePasswordModel =  Object.assign({}, this.changePasswordModel, this.changePasswordForm.value);
            this.changePasswordModel.email = this.email;
            this.changePasswordModel.token = this.token;

            this.accountService.resetPassword(this.changePasswordModel)
            .subscribe(
              () => {this.proccessSuccess()},
              fail => {this.proccessFail(fail)}
            );
  
            this.notSavedChanges = false;            
        }
    }

    proccessSuccess(){
        this.changePasswordForm.reset();
        this.errors = [];
        this.accountService.LocalStorage.cleanLocalDataUser();
        this.toastr.success('Sua senha foi alterada!', 'Sucesso!');  

        this.router.navigate(['/account/login']);
    }
  
    proccessFail(fail : any){
        this.errors = fail.error.errors;
        this.toastr.error('Ocorreu um erro!', 'Opa :(');
    }
  
 }