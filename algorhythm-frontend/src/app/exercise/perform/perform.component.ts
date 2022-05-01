import { Component, ElementRef, OnInit, ViewChildren } from '@angular/core';
import { FormBuilder, FormControlName, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LocalStorageUtils } from 'src/app/utils/localstorage';
import { Exercise } from '../models/exercise';
import { ExerciseService } from '../services/exercise.service';

@Component({
  selector: 'app-perform',
  templateUrl: './perform.component.html'
})
export class PerformComponent implements OnInit {

  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

  answerForm: FormGroup;

  errors: any[] = [];

  moduleId: number;
  user: any;
  localStorage = new LocalStorageUtils();

  exercise : Exercise = new Exercise();

  wrongAnswer : boolean = false;
  correctAnswer : boolean = false;
  skip : boolean = false

  radio: string;

  constructor(private fb: FormBuilder,private route: ActivatedRoute, private router: Router, private exerciseService: ExerciseService, private toastr: ToastrService) {
    this.moduleId = this.route.snapshot.data['number'];
  }

  ngOnInit(): void {
    this.user = this.localStorage.getUser();

    if (this.user) {

      this.answerForm = this.fb.group({
        radio: ['']
      });

      this.exerciseService.getExerciseToDoByModuleAndUser(this.moduleId, this.user.id)
      .subscribe(
        data => { this.proccessSuccess(data) },
        fail => { this.proccessFail(fail) }
      );

    }
  }

  proccessSuccess(data : any){
      this.exercise = data;
  }

  proccessFail(fail: any) {
    this.errors = fail.error.errors;
    this.toastr.error('Ocorreu um erro!', 'Opa :(');
    this.router.navigate(['/home']);
  }

  skipExercise(): void{
    this.skip = true;
  }

  verifyAnswer(){
    this.answerForm.value;
  }
}
