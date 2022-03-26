import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/internal/Observable";
import { catchError, map } from "rxjs/operators";
import { BaseService } from "src/app/services/base.service";
import { Exercise } from "../models/exercise";

@Injectable()
export class ExerciseService extends BaseService{

    constructor (private http: HttpClient){ super(); }

    createExercise(exercise: Exercise) : Observable<Exercise> {
        let response = this.http
            .post(this.UrlServiceV1 + 'exercises', exercise, this.GetHeaderJson())
            .pipe(
                map(this.extractData),
                catchError(this.serviceError));

        return response;
    }
}