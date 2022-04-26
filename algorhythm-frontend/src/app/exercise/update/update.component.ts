import { AfterViewInit, Component, ElementRef, OnInit, ViewChildren } from '@angular/core';
import { FormBuilder, FormControlName, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CustomValidators } from 'ngx-custom-validators';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { fromEvent, merge, Observable } from 'rxjs';
import { DisplayMessage, GenericValidator, ValidationMessages } from 'src/app/utils/generic-form-validation';
import { Alternative } from '../models/alternative';
import { Exercise } from '../models/exercise';
import { ExerciseService } from '../services/exercise.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html'
})
export class UpdateComponent implements OnInit, AfterViewInit {

  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

  updateForm: FormGroup;
  updateAlternativeForm: FormGroup;
  notSavedChanges: boolean;

  modules = [
    { id: "1", title: "Introdução a Algoritmos", level: 1 },
    { id: "2", title: "Operadores de atribuição", level: 2 },
    { id: "3", title: "Operadores aritméticos", level: 3 },
    { id: "4", title: "Operadores de incremento e decremento", level: 4 },
    { id: "5", title: "Operadores lógicos e relacionais", level: 5 },
    { id: "6", title: "Operações de entrada e saída", level: 6 },
    { id: "7", title: "Estruturas condicionais", level: 7 },
    { id: "8", title: "Estruturas de repetição", level: 8 }
  ]

  errors: any[] = [];
  errorsAlternative: any[] = [];

  exercise: Exercise = new Exercise();
  alternative: Alternative = new Alternative();
  displayMessage: DisplayMessage = {};

  newAlternative: string;
  genericValidator: GenericValidator;
  validationMessage: ValidationMessages;
  correctAlternative: string = "";

  constructor(private fb: FormBuilder,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute,
    private exerciseService: ExerciseService,
    private modalService: NgbModal,
    private spinner: NgxSpinnerService) {
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
      explanation: {
        required: 'Informe a explicação da questão'
      }
    };
    this.genericValidator = new GenericValidator(this.validationMessage);

    this.exercise = this.route.snapshot.data['exercise'];
  }

  ngOnInit(): void {
    this.spinner.show();

    this.updateForm = this.fb.group({
      id: '',
      moduleId: ['', [Validators.required]],
      question: ['', [Validators.required, CustomValidators.rangeLength([10, 300])]],
      correctAlternative: ['', [Validators.required]],
      explanation: ['', [Validators.required]]
    });

    this.updateAlternativeForm = this.fb.group({
      id: '',
      exerciseId: '',
      title: ''
    })

    this.fillForm();

    setTimeout(() => {
      this.spinner.hide();
    }, 1000);
  }

  ngAfterViewInit(): void {
    let controlBlurs: Observable<any>[] = this.formInputElements
      .map((formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur'));

    merge(...controlBlurs).subscribe(() => {
      this.displayMessage = this.genericValidator.processMessages(this.updateForm);
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

  updateExercise() {
    if (this.updateForm.dirty && this.updateForm.valid) {
      this.exercise = Object.assign({}, this.exercise, this.updateForm.value);
      this.exercise.alternatives = null;
      this.exercise.level = this.exercise.moduleId

      this.exerciseService.updateExercise(this.exercise)
        .subscribe(
          () => { this.proccessSuccess() },
          fail => { this.proccessFail(fail) }
        );

      this.notSavedChanges = false;
    }
  }

  updateAlternative() {
    if (this.updateAlternativeForm.dirty && this.updateAlternativeForm.valid) {
      this.alternative = Object.assign({}, this.alternative, this.updateAlternativeForm.value);

      this.exerciseService.updateAlternative(this.alternative)
        .subscribe(
          () => { this.proccessSuccessAlternative(this.alternative) },
          fail => { this.proccessFailAlternative(fail) }
        );

      this.notSavedChanges = false;
    }
  }


  fillForm() {
    this.updateForm.patchValue({
      id: this.exercise.id,
      question: this.exercise.question,
      moduleId: this.modules.find((element) => element.id == this.exercise.moduleId.toString()).id,
      correctAlternative: this.exercise.correctAlternative,
      alternativesUpdate: this.exercise.alternativesUpdate,
      explanation: this.exercise.explanation
    })
  }

  fillAlternativeForm(alternative: Alternative) {
    this.updateAlternativeForm.patchValue({
      id: alternative.id,
      title: alternative.title,
      exerciseId: this.exercise.id
    })
  }

  proccessSuccessAlternative(alternative: Alternative) {
    this.errors = [];

    this.toastr.success('Exercício atualizado com sucesso!', 'Sucesso!');
    this.modalService.dismissAll();
    this.exercise.alternativesUpdate.find((element) => element.id == alternative.id).title = alternative.title;
  }

  proccessSuccess() {
    this.updateForm.reset();
    this.errors = [];

    this.toastr.success('Exercício atualizado com sucesso!', 'Sucesso!');

    this.router.navigate(['exercise/list']);
  }

  proccessFail(fail: any) {
    this.errors = fail.error.errors;
    this.toastr.error('Ocorreu um erro!', 'Opa :(');
  }

  proccessFailAlternative(fail: any) {
    this.errorsAlternative = fail.error.errors;
    this.toastr.error('Ocorreu um erro!', 'Opa :(');
  }

  openModal(content) {
    this.modalService.open(content);
  }
}