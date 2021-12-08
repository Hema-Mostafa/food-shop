import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from 'shared/services/auth.service';
import { UserService } from 'shared/services/user.service';
import { switchMap, map } from "rxjs/operators";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminGard implements CanActivate {

  constructor(
    private UserService: UserService,
    private auth: AuthService,
    private router: Router) { }
  canActivate() {

    return this.auth.user$.pipe(
      switchMap(user => this.UserService.get(user.uid).valueChanges())
    )
      .pipe(map(appUSer => {
        return appUSer.isAdmin
      }))
  }

}