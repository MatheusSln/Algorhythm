import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Exercise } from '../models/exercise';
import { ExerciseService } from '../services/exercise.service';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html'
})
export class DeleteComponent {

  exercise: Exercise = new Exercise();
  errors = [];

  constructor(private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute,
    private exerciseService: ExerciseService,
    private spinner: NgxSpinnerService) {

      this.exercise = this.route.snapshot.data['exercise'];

    console.log(this.exercise);

    setTimeout(() => {
      this.spinner.hide();
    }, 1000);
  }

  ngOnInit(): void {
    this.spinner.show();
  }

  deleteExercise() {
    this.exerciseService.deleteExercise(this.exercise)
      .subscribe(
        () => { this.successDelete() },
        fail => { this.error(fail) }
      )
  }

  successDelete() {
    this.toastr.success('Exercício excluido com Sucesso!', 'Até mais! :D');
    
    this.router.navigate(['exercise/list']);
  }

  error(fail) {
    this.errors = fail.error.errors;
    this.toastr.error('Houve um erro no processamento!', 'Ops! :(');
  }
}
