import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { CustomFormsModule } from "ngx-custom-validators";
import { NgxSpinner, NgxSpinnerModule } from "ngx-spinner";
import { AccountRoutingModule } from "../account/account.route";
import { CreateComponent } from "./create/create.component";
import { DeleteComponent } from "./delete/delete.component";
import { ExerciseAppComponent } from "./exercise.app.component";
import { ExerciseRoutingModule } from "./exercise.route";
import { ListComponent } from "./list/list.component";
import { ExerciseResolve } from "./services/exercise.resolve";
import { ExerciseService } from "./services/exercise.service";
import { UpdateComponent } from "./update/update.component";
import { PerformComponent } from './perform/perform.component';
import { PerformResolve } from "./services/perform.resolve";
import { AccountService } from "../account/services/account.service";
import { PerformGuard } from "./services/perform.guard";

@NgModule({
    declarations: [
      ExerciseAppComponent,
      CreateComponent,
      ListComponent,
      DeleteComponent,
      UpdateComponent,
      PerformComponent
    ],
    imports: [
        CommonModule,
        ExerciseRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        CustomFormsModule,
        NgxSpinnerModule
    ],
    providers: [
      ExerciseService,
      AccountService,
      ExerciseResolve,
      PerformResolve,
      PerformGuard
    ]
  })
  export class ExerciseModule { }