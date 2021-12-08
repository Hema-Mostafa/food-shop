import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from "firebase";
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'shared/services/user.service';
import { AppUser } from 'shared/models/app-users';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user$: Observable<firebase.User>;

  constructor(
    private afAuth: AngularFireAuth,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router) {
    this.user$ = afAuth.authState;
  }

  login() {
    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl', returnUrl);

    this.afAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then(res => this.router.navigateByUrl(returnUrl))
      .catch(error => alert(error));
  }

  logout() {
    this.afAuth.signOut();
    this.router.navigate(['/']);
  }

  get appUser$(): Observable<AppUser> {

    return this.user$.pipe(
      switchMap(user => {
        if (user)
          return this.userService.get(user.uid).valueChanges();
        else return of(null);

      })
    )

  }
}