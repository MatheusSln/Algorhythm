import { Component, ElementRef, OnInit, ViewChildren } from '@angular/core';
import { FormBuilder, FormControlName, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from 'src/app/account/services/account.service';
import { LocalStorageUtils } from 'src/app/utils/localstorage';
import { Exercise } from '../models/exercise';
import { ExerciseService } from '../services/exercise.service';
import * as introJs from 'intro.js/intro.js';
import { Level } from 'src/app/utils/levelEnum';
@Component({
  selector: 'app-perform',
  templateUrl: './perform.component.html',
})
export class PerformComponent implements OnInit {
  @ViewChildren(FormControlName, { read: ElementRef })
  formInputElements: ElementRef[];

  introJS = introJs();

  answerForm: FormGroup;

  errors: any[] = [];

  moduleId: number;
  user: any;
  userLevel: Level;
  localStorage = new LocalStorageUtils();

  exercise: Exercise = new Exercise();

  wrongAnswer: boolean = false;
  correctAnswer: boolean = false;
  skip: boolean = false;

  radio: string;

  canExit: boolean = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private exerciseService: ExerciseService,
    private accountService: AccountService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) {
    this.moduleId = this.route.snapshot.data['number'];

    this.introJS.setOptions({
      hidePrev: true,
      exitOnOverlayClick: false,
      disableInteraction: true,
      dontShowAgain: true,
      nextLabel: 'Próximo',
      prevLabel: 'Voltar',
      doneLabel: 'Pronto',
      dontShowAgainLabel: 'Não mostrar novamente',
      steps: [
        {
          element: '#question',
          intro:
            'Aqui fica o enunciado do exercício.',
          position: 'bottom',
        },
        {
          element: '#alternatives',
          intro: 'Aqui ficam as alternativas referente ao enunciado, basta selecionar a que você considerar correta.',
          position: 'left',
        },
        {
          element: '#verify',
          intro: 'Ao clicar em \"Vericar\" o sistema irá validar a alternativa selecionada.',
          position: 'left',
        },
        {
          element: '#skip',
          intro: 'Caso deseje pular a questão basta clicar em \"Pular\" e o sistema mostrará a resposta.',
          position: 'left',
        },        
      ],
    });
  }

  ngOnInit(): void {
    this.spinner.show();
    this.user = this.localStorage.getUser();

    if (this.user) {
      this.answerForm = this.fb.group({
        radio: [''],
      });

      this.userLevel = this.user.claims.find(
        (element) => element.type == 'level'
      ).value;      

      this.exerciseService
        .getExerciseToDoByModuleAndUser(this.moduleId, this.user.id)
        .subscribe(
          (data) => {
            this.proccessSuccess(data);
          },
          (fail) => {
            this.proccessFail(fail);
          }
        );

    } else {
      this.localStorage.cleanLocalDataUser();
      this.router.navigate(['account/login']);
    }

    this.spinner.hide();
  }

  proccessSuccess(data: any) {
    if (data == null) {
      this.canExit = true;
      this.accountService.refreshToken(this.user.email).subscribe(
        (data) => {
          this.accountService.LocalStorage.cleanLocalDataUser();
          this.accountService.LocalStorage.saveLocalDataUser(data);
          this.toastr.success('Você finalizou o módulo!', 'Parabéns!');
          this.router.navigate(['/home']);
        },
        () => {
          this.toastr.error('Ocorreu um erro!', 'Opa :(');
          this.router.navigate(['/home']);
        }
      );
    }

    this.exercise = data;

    if (this.userLevel == 1){
      setTimeout(()=> {
        this.introJS.start();
      }, 1000);
      
    }
  }

  proccessFail(fail: any) {
    this.errors = fail.error.errors;
    this.toastr.error('Ocorreu um erro!', 'Opa :(');
    this.router.navigate(['/home']);
  }

  verifyAnswer() {
    if (this.answerForm.dirty) {
      this.exerciseService
        .verifyAnswer(
          this.answerForm.value.radio,
          this.exercise.id,
          this.user.id.toString()
        )
        .subscribe(
          (data) => {
            this.proccessSuccessVerifyAnswer(data);
          },
          (fail) => {
            this.proccessFail(fail);
          }
        );
    }
  }

  skipExercise() {
    this.exerciseService
      .verifyAnswer(null, this.exercise.id, this.user.id.toString())
      .subscribe(
        (data) => {
          this.proccessSuccessVerifyAnswer(data);
        },
        (fail) => {
          this.proccessFail(fail);
        }
      );
  }

  continue() {
    this.answerForm.reset();
    this.spinner.show();
    this.exerciseService
      .getExerciseToDoByModuleAndUser(this.moduleId, this.user.id)
      .subscribe(
        (data) => {
          this.proccessSuccess(data);
          (this.wrongAnswer = false),
            (this.correctAnswer = false),
            (this.skip = false),
            this.spinner.hide();
        },
        (fail) => {
          this.proccessFail(fail), this.spinner.hide();
        }
      );
  }

  proccessSuccessVerifyAnswer(data: boolean) {
    if (data == true) {
      this.correctAnswer = data;
    } else {
      this.wrongAnswer = true;
    }
  }
}
