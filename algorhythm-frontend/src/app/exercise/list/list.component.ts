import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Exercise } from '../models/exercise';
import { ExerciseService } from '../services/exercise.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html'
})
export class ListComponent implements OnInit {

  public exercises: Exercise[];
  errorMessage: string;

  constructor(private exerciseService: ExerciseService, private spinner: NgxSpinnerService, private toastr: ToastrService, private router: Router) { }

  ngOnInit(): void {
    this.spinner.show();

    this.exerciseService.getAll()
      .subscribe(
        exercises => {
          this.spinner.hide(),
          this.exercises = exercises
        },
        error => {
          this.spinner.hide(),
          this.errorMessage = error,
          this.toastr.error("Algo deu errado :/", "Erro"),
          this.router.navigate(['/home']);
        });
  }
}