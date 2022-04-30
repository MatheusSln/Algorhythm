import { Component, OnInit } from '@angular/core';
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

  errors: any[] = [];

  moduleId: number;
  user: any;
  localStorage = new LocalStorageUtils();

  exercise : Exercise = new Exercise();

  wrongAnswer : boolean = false;
  skip : boolean = false

  constructor(private route: ActivatedRoute, private router: Router, private exerciseService: ExerciseService, private toastr: ToastrService) {
    this.moduleId = this.route.snapshot.data['number'];
  }

  ngOnInit(): void {
    this.user = this.localStorage.getUser();

    if (this.user) {

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

}
