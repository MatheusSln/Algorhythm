import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
    selector: 'app-registerConfirm',
    templateUrl: './registerConfirm.component.html'
  })
export class RegisterConfirmComponent implements OnInit{

  isConfirmed: boolean;

    constructor(private route: ActivatedRoute, private router: Router){
      this.isConfirmed = this.route.snapshot.data['bool'];
    }

    ngOnInit(){
        
    }
}