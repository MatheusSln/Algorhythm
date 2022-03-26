import { Component, OnInit } from '@angular/core';
import { Exercise } from '../models/exercise';
import { ExerciseService } from '../services/exercise.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html'
})
export class ListComponent implements OnInit {

  public exercises: Exercise[];
  errorMessage: string;

  constructor(private exerciseService: ExerciseService) {   console.log(this.exercises) }

  ngOnInit(): void {
    this.exerciseService.getAll()
      .subscribe(
        exercises => this.exercises = exercises,
        
        error => this.errorMessage);
  }
}