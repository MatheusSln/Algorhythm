import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Exercise } from '../models/exercise';
import { ExerciseService } from './exercise.service';

@Injectable()
export class ExerciseResolve implements Resolve<Exercise> {

    constructor(private exerciseService: ExerciseService) { }

    resolve(route: ActivatedRouteSnapshot) {
        return this.exerciseService.getById(route.params['id']);
    }
}