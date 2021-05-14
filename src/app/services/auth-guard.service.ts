import { ActivatedRouteSnapshot, CanActivate,Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import firebase from 'firebase';

@Injectable({providedIn: 'root'})


export class AuthGuard {

  constructor(private router: Router) { }

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    return new Promise(
      (resolve, reject) => {
        firebase.auth().onAuthStateChanged(
          (user) => {
            if(user) {
              resolve(true);
            } else {
              this.router.navigate(['connexion']);
              resolve(false);
            }
          }
        );
      }
    );
  }
}