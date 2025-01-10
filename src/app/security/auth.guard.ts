import {
  ActivatedRouteSnapshot,
  CanActivate, CanActivateChild,
  GuardResult,
  MaybeAsync,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import {Injectable} from "@angular/core";
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {

  constructor(private router: Router,
              private authSrv: AuthService) {
  }


  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<GuardResult> {
    console.log('canActivate ', route.url, state.url);
    if (this.authSrv.isAccessTokenInvalid()) {
      this.router.navigate(['/login', state.url])
      return false;
    }
    return true;
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<GuardResult> {
    console.log('canActivateChild ', childRoute.url, state.url);
    if (this.authSrv.isAccessTokenInvalid()) {
      this.router.navigate(['/login', state.url])
      return false;
    }
    return true;
  }
}
