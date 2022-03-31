import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CreateComponent } from "./create/create.component";
import { DeleteComponent } from "./delete/delete.component";
import { ExerciseAppComponent } from "./exercise.app.component";
import { ListComponent } from "./list/list.component";
import { ExerciseResolve } from "./services/exercise.resolve";
import { UpdateComponent } from "./update/update.component";

const exerciseRouterConfig: Routes =  [
    {
        path: '', component: ExerciseAppComponent,
        children:[
            {path: 'create', component: CreateComponent},
            {path: 'list', component: ListComponent},
            {path: 'delete/:id', component: DeleteComponent, resolve:{ exercise: ExerciseResolve}},
            {path: 'update/:id', component: UpdateComponent, resolve: { exercise: ExerciseResolve}}
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