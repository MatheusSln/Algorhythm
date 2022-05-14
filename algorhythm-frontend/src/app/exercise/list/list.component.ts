import { DecimalPipe } from '@angular/common';
import { Component, OnInit, PipeTransform } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Observable, pipe } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Exercise } from '../models/exercise';
import { ExerciseService } from '../services/exercise.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
})
export class ListComponent implements OnInit {
  public exercises: Exercise[];
  errorMessage: string;

  filter = new FormControl('');

  exercises$: Observable<Exercise[]>;

  constructor(
    private exerciseService: ExerciseService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.spinner.show();

    this.exerciseService.getAll().subscribe(
      (exercises) => {
        this.spinner.hide(),
          (this.exercises = exercises),
          (this.exercises$ = this.filter.valueChanges.pipe(
            startWith(''),
            map((text) => this.search(text))
          ));
      },
      (error) => {
        this.spinner.hide(),
          (this.errorMessage = error),
          this.toastr.error('Algo deu errado :/', 'Erro');
      }
    );
  }

  search(text: string): Exercise[] {
    return this.exercises.filter((exercise) => {
      const term = text.toLowerCase();
      return exercise.question.toLowerCase().includes(term) ||
            exercise.moduleId.toString().includes(term);
    });
  }
}
