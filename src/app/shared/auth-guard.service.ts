import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  Router,
  RouterStateSnapshot,
  UrlTree
} from '@angular/router';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {AuthService} from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate{

  constructor(private authService: AuthService,
              private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if (!this.authService.isAuthenticated()) {
      return this.router.navigate(['/']);
    }
    return true
    // return  this.authService.isAuthenticated()
    //     .then((authenticated: a) => {
    //       if (authenticated) {
    //         return true;
    //       } else {
    //         this.router.navigate(['/']);
    //       }
    //     });
  }

  // canActivate(route: ActivatedRouteSnapshot,
  //             state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
  //   return  this.authService.isAuthenticated()
  //     .then((authenticated: boolean) => {
  //       if (authenticated) {
  //         return true;
  //       } else {
  //         this.router.navigate(['/']);
  //       }
  //     });
  // }

  // canActivateChild(childRoute: ActivatedRouteSnapshot,
  //                  state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
  //   return this.canActivate(childRoute, state);
  // }


}
