import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CreateComponent } from "./create/create.component";
import { DeleteComponent } from "./delete/delete.component";
import { ExerciseAppComponent } from "./exercise.app.component";
import { ListComponent } from "./list/list.component";

const exerciseRouterConfig: Routes =  [
    {
        path: '', component: ExerciseAppComponent,
        children:[
            {path: 'create', component: CreateComponent},
            {path: 'list', component: ListComponent},
            {path: 'delete', component: DeleteComponent}
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