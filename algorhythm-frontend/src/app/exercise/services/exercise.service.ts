import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/internal/Observable";
import { catchError, map } from "rxjs/operators";
import { BaseService } from "src/app/services/base.service";
import { Alternative } from "../models/alternative";
import { Exercise } from "../models/exercise";

@Injectable()
export class ExerciseService extends BaseService {

    constructor(private http: HttpClient) { super(); }

    createExercise(exercise: Exercise): Observable<Exercise> {
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

    deleteExercise(exercise: Exercise): Observable<Exercise> {
        let response = this.http
            .put(this.UrlServiceV1 + 'exercises/delete', exercise, this.GetHeaderJson())
            .pipe(
                map(this.extractData),
                catchError(this.serviceError));

        return response;
    }
    updateAlternative(alternative: Alternative): Observable<Alternative> {
        let response = this.http
            .put(this.UrlServiceV1 + 'exercises/alternative', alternative, this.GetHeaderJson())
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

    getExerciseToDoByModuleAndUser(moduleId: number, userId: string){
        return this.http
            .get<Exercise>(this.UrlServiceV1 + "exercises/exercisestodo?moduleId=" + moduleId + "&userId=" + userId)
            .pipe(catchError(super.serviceError));
    }
}