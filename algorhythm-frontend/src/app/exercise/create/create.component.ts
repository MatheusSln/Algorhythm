import { Exercise } from './../models/exercise';
import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChildren } from '@angular/core';
import { FormBuilder, FormControlName, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ExerciseService } from '../services/exercise.service';
import { DisplayMessage, GenericValidator, ValidationMessages } from 'src/app/utils/generic-form-validation';
import { Observable } from 'rxjs/internal/Observable';
import { fromEvent } from 'rxjs/internal/observable/fromEvent';
import { merge } from 'rxjs/internal/observable/merge';
import { CustomValidators } from 'ngx-custom-validators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html'
})
export class CreateComponent implements OnInit, AfterViewInit {

  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

  createForm: FormGroup;

  notSavedChanges: boolean;

  modules = [
    { id: "1", title: "Introdução a algoritmos", level: 1 },
    { id: "2", title: "Operadores de atribuição", level: 2 },
    { id: "3", title: "Operadores aritméticos", level: 3 },
    { id: "4", title: "Operadores de incremento e decremento", level: 4 },
    { id: "5", title: "Operadores lógicos e relacionais", level: 5 },
    { id: "6", title: "Operações de entrada e saída", level: 6 },
    { id: "7", title: "Estruturas condicionais", level: 7 },
    { id: "8", title: "Estruturas de repetição", level: 8 }
  ]

  errors: any[] = [];

  exercise: Exercise = {
    id: "",
    moduleId: 0,
    question: "",
    level: 0,
    alternatives: [],
    correctAlternative: "",
    alternativesUpdate: [],
    explanation: "",
    deletedAt: null
  };

  displayMessage: DisplayMessage = {};

  newAlternative: string;
  genericValidator: GenericValidator;
  validationMessage: ValidationMessages;
  correctAlternative: string = "";

  constructor(private fb: FormBuilder, private toastr: ToastrService, private router: Router, private exerciseService: ExerciseService) {
    this.validationMessage = {
      moduleId: {
        required: 'Informe o modulo'
      },
      question: {
        required: 'Informe o enunciado',
        rangeLength: 'o enunciado precisa ter no mínimo 10 caracteres'
      },
      correctAlternative: {
        required: 'Informe a resposta da questão'
      },
      explanation:{
        required: 'Informe a explicação da questão'
      }
    };
    this.genericValidator = new GenericValidator(this.validationMessage);
  }

  ngOnInit(): void {
    this.createForm = this.fb.group({
      moduleId: ['', [Validators.required]],
      question: ['', [Validators.required, CustomValidators.rangeLength([10, 300])]],
      correctAlternative: ['', [Validators.required]],
      explanation: ['', [Validators.required]]
    });
  }

  ngAfterViewInit(): void {
    let controlBlurs: Observable<any>[] = this.formInputElements
      .map((formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur'));

    merge(...controlBlurs).subscribe(() => {
      this.displayMessage = this.genericValidator.processMessages(this.createForm);
      this.notSavedChanges = true;
    });
  }

  addAlternative(value: string) {
    if (value == "")
      return

    if (this.exercise.alternatives.find((element) => element == value))
      return

    if (this.exercise.alternatives.length >= 4) {
      this.toastr.info("Máximo de 4 alternativas atingido", "Aviso!")
      return
    }
    this.exercise.alternatives.push(value)
    this.newAlternative = ""
  }

  removeAlternative(value: string) {
    this.exercise.alternatives.splice(this.exercise.alternatives.indexOf(value), 1)
  }

  createExercise() {
    if (this.createForm.dirty && this.createForm.valid) {
      this.exercise = Object.assign({}, this.exercise, this.createForm.value);
      this.exercise.level = this.exercise.moduleId

      this.exerciseService.createExercise(this.exercise)
        .subscribe(
          () => { this.proccessSuccess() },
          fail => { this.proccessFail(fail) }
        );

      this.notSavedChanges = false;
    }
  }

  proccessSuccess() {
    this.createForm.reset();
    this.errors = [];

    this.toastr.success('Exercício criado com sucesso!', 'Sucesso!');

    this.router.navigate(['exercise/list']);
  }

  proccessFail(fail: any) {
    this.errors = fail.error.errors;
    this.toastr.error('Ocorreu um erro!', 'Opa :(');
  }
}

