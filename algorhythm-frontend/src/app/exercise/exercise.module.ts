import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { CustomFormsModule } from "ngx-custom-validators";
import { AccountRoutingModule } from "../account/account.route";
import { CreateComponent } from "./create/create.component";
import { DeleteComponent } from "./delete/delete.component";
import { ExerciseAppComponent } from "./exercise.app.component";
import { ExerciseRoutingModule } from "./exercise.route";
import { ListComponent } from "./list/list.component";
import { ExerciseService } from "./services/exercise.service";

@NgModule({
    declarations: [
      ExerciseAppComponent,
      CreateComponent,
      ListComponent,
      DeleteComponent
    ],
    imports: [
        CommonModule,
        ExerciseRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        CustomFormsModule
    ],
    providers: [
      ExerciseService
    ]
  })
  export class ExerciseModule { }