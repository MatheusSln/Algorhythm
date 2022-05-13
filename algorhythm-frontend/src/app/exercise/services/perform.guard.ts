import { Injectable } from '@angular/core';
import { CanActivate, CanDeactivate, Router } from '@angular/router';
import { LocalStorageUtils } from 'src/app/utils/localstorage';
import { PerformComponent } from '../perform/perform.component';

@Injectable()
export class PerformGuard implements CanDeactivate<PerformComponent> {
  localStorageUtils = new LocalStorageUtils();

  constructor(private router: Router) {}

  canDeactivate(component: PerformComponent) {
    if(!component.canExit){
      return window.confirm(
        'Tem certeza que deseja abandonar a realização do módulo?'
      );
    }

    return true;
  }
}
