import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})


export class AuthGuard implements CanActivate {


  constructor(private _router: Router, private _serviceAuth: AuthService) {

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    this._serviceAuth.userInSession().then((user) => {
      console.log(user);
    }).catch((err) => {
      console.log(err)
      this._router.navigate(['user'])
      return false
    })
    return true;
  }

}
