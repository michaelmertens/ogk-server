import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import 'rxjs/add/operator/filter';
import * as auth0 from 'auth0-js';
import { BehaviorSubject } from 'rxjs/Rx';
import { LoggerService } from 'app/core/services/logger.service';
import { environment } from "environments/environment";
import { StorageService } from "app/core/services/storage.service";
import { IMember } from "models/api-contracts/members";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class AuthService {
  public authStatus: BehaviorSubject<boolean>;
  public memberId: BehaviorSubject<string>;
  public redirectUrl: string;

  auth0 = new auth0.WebAuth({
    clientID: environment.authClientId,
    domain: environment.authDomain,
    responseType: 'token id_token',
    audience: environment.authAudience,
    redirectUri: environment.authCallbackUrl,
    scope: 'openid'
  });

  constructor(public router: Router, private storage: StorageService) {
    this.authStatus = <BehaviorSubject<boolean>>new BehaviorSubject(this.isAuthenticated());
    this.memberId = <BehaviorSubject<string>>new BehaviorSubject(this.getMemberId());
    
    if (this.isAuthenticated() && !this.getMemberId()) {
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

        if (this.isAuthenticated() && !this.storage.get('member_id')) {
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
    const memberId = authResult.idTokenPayload['https://guldenkano.herokuapps.com/member-id'];
    if (!memberId) throw new Error("Illegal user");

    this.storage.store('member_id', authResult.idTokenPayload['https://guldenkano.herokuapps.com/member-id']);
    this.storage.store('access_token', authResult.accessToken);
    this.storage.store('id_token', authResult.idToken);
    this.storage.store('expires_at', expiresAt);
    this.memberId.next(memberId);
  }

  public logout(): void {
    // Remove tokens and expiry time from storage
    this.storage.remove('member_id');
    this.storage.remove('access_token');
    this.storage.remove('id_token');
    this.storage.remove('expires_at');
    // update auth status
    this.memberId.next(undefined);
    this.authStatus.next(false);
    // Go back to the home route
    this.router.navigate(['/']);
  }

  public isAuthenticated(): boolean {
    // Check whether the current time is past the
    // access token's expiry time
    const expiresAt = this.storage.get('expires_at');
    if (!expiresAt) return false;
    
    const expiresAtDate = JSON.parse(expiresAt);
    return new Date().getTime() < expiresAt;
  }

  public getAuthorizationHeader(): string {
    if (!this.isAuthenticated) return undefined;
    return 'Bearer ' + this.storage.get('id_token');
  }

  private getMemberId(): string {
    return this.storage.get('member_id');
  }
}

@Injectable()
export class AuthGuard {
  constructor(
    private authService: AuthService,
    private storage: StorageService,
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
    if (!this.storage.get('member_id')) {
      console.info('AuthGuard redirecting to under-review page..');
      this.router.navigate(['/under-review']);
      return false;
    }
    return true;
  }
}
