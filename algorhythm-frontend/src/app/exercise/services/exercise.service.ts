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

    updateExercise(exercise: Exercise): Observable<Exercise> {
        let response = this.http
            .put(this.UrlServiceV1 + 'exercises', exercise, this.GetHeaderJson())
            .pipe(
                map(this.extractData),
                catchError(this.serviceError));

        return response;
    }

    getAll(): Observable<Exercise[]> {
        return this.http
            .get<Exercise[]>(this.UrlServiceV1 + "exercises", this.GetHeaderJson())
            .pipe(catchError(super.serviceError));
    }
    
    getById(id: string): Observable<Exercise> {
        return this.http
            .get<Exercise>(this.UrlServiceV1 + "exercises/" + id)
            .pipe(catchError(super.serviceError));
    }    
}