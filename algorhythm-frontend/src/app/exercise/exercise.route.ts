import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CreateComponent } from "./create/create.component";
import { DeleteComponent } from "./delete/delete.component";
import { ExerciseAppComponent } from "./exercise.app.component";
import { ListComponent } from "./list/list.component";
import { PerformComponent } from "./perform/perform.component";
import { ExerciseResolve } from "./services/exercise.resolve";
import { PerformGuard } from "./services/perform.guard";
import { PerformResolve } from "./services/perform.resolve";
import { UpdateComponent } from "./update/update.component";

const exerciseRouterConfig: Routes =  [
    {
        path: '', component: ExerciseAppComponent,
        children:[
            {path: 'create', component: CreateComponent},
            {path: 'list', component: ListComponent},
            {path: 'delete/:id', component: DeleteComponent, resolve:{ exercise: ExerciseResolve}},
            {path: 'update/:id', component: UpdateComponent, resolve: { exercise: ExerciseResolve}},
            {path: 'perform/:moduleId', component: PerformComponent, resolve: { number: PerformResolve}, canDeactivate: [PerformGuard]}
        ]
    }
]

@NgModule({
    imports: [
        RouterModule.forChild(exerciseRouterConfig)
    ],
    exports: [RouterModule]
})
export class ExerciseRoutingModule {}