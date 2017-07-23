import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import 'rxjs/add/operator/filter';
import * as auth0 from 'auth0-js';
import { BehaviorSubject } from 'rxjs/Rx';
import { LoggerService } from 'app/core/services/logger.service';

@Injectable()
export class AuthService {
  public authStatus: BehaviorSubject<boolean>;
  public redirectUrl: string;

  auth0 = new auth0.WebAuth({
    clientID: 'aBgzXp6IjcQrdRGNOGtoDF5qrKoY17Bh',
    domain: 'guldenkano.eu.auth0.com',
    responseType: 'token id_token',
    audience: 'https://guldenkano.eu.auth0.com/userinfo',
    redirectUri: 'http://localhost:4200/callback',
    scope: 'openid'
  });

  constructor(public router: Router) {
    this.authStatus = <BehaviorSubject<boolean>>new BehaviorSubject(this.isAuthenticated());
    if (this.isAuthenticated() && !localStorage.getItem('member_id')) {
      this.router.navigate(['/under-review']);
    } else {
      this.router.navigate(['/home']);
    }
  }

  public goToLogin(redirectUrl?: string): void {
    // Store the attempted URL for redirecting
    this.redirectUrl = redirectUrl;

    // Navigate to the starting page
    // TODO: if user logged in before, go straight to login page
    this.router.navigate(['start']);
  }

  public login(): void {
    this.auth0.authorize();
  }

  public handleAuthentication(): void {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        window.location.hash = '';
        this.setSession(authResult);
        this.authStatus.next(true);

        if (this.isAuthenticated() && !localStorage.getItem('member_id')) {
          this.router.navigate(['/under-review']);
        } else {
          this.router.navigate(['/home']);
        }
      } else if (err) {
        this.router.navigate(['/home']);
        console.log(err);
      }
    });
  }

  private setSession(authResult): void {
    // Set the time that the access token will expire at
    const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
    localStorage.setItem('member_id', authResult.idTokenPayload['https://guldenkano.herokuapps.com/member-id']);
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);
  }

  public logout(): void {
    // Remove tokens and expiry time from localStorage
    localStorage.removeItem('member_id');
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    // update auth status
    this.authStatus.next(false);
    // Go back to the home route
    this.router.navigate(['/']);
  }

  public isAuthenticated(): boolean {
    // Check whether the current time is past the
    // access token's expiry time
    const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return new Date().getTime() < expiresAt;
  }

  public getAuthorizationHeader(): string {
    if (!this.isAuthenticated) return undefined;
    return 'Bearer ' + localStorage.getItem('id_token');
  }
}

@Injectable()
export class AuthGuard {
  constructor(
    private authService: AuthService,
    private logger: LoggerService,
    private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const url: string = state.url;
    return this.checkLogin(url);
  }

  checkLogin(url: string): boolean {
    if (!this.authService.isAuthenticated()) {
      console.info('AuthGuard redirecting to login page..');
      this.authService.goToLogin(url);
      return false;
    }
    if (!localStorage.getItem('member_id')) {
      console.info('AuthGuard redirecting to under-review page..');
      this.router.navigate(['/under-review']);
      return false;
    }
    return true;
  }
}
