import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Exercise } from '../models/exercise';
import { ExerciseService } from '../services/exercise.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html'
})
export class ListComponent implements OnInit {

  public exercises: Exercise[];
  errorMessage: string;

  constructor(private exerciseService: ExerciseService, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.spinner.show();

    this.exerciseService.getAll()
      .subscribe(
        exercises => this.exercises = exercises,
        
        error => this.errorMessage);

      setTimeout(()=> {
        this.spinner.hide();
      }, 1000);
  }
}