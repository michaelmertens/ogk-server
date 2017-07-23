import {
  ModuleWithProviders,
  NgModule,
  Optional,
  SkipSelf,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { LoggerService } from './services/logger.service';
import { MemberService } from './services/member.service';
import { RandomService } from './services/random.service';
import { NavbarComponent } from './navigation/navbar/navbar.component';
import { CallbackComponent } from './callback/callback.component';
import { SharedModule } from "app/shared/shared.module";
import { AuthService } from "app/core/services/auth.service";
import { AuthInterceptor } from "app/core/services/http.service";

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    RouterModule,
    SharedModule,
  ],
  exports: [
    NavbarComponent,
    RouterModule,
  ],
  declarations: [
    NavbarComponent,
    CallbackComponent,
  ],
  providers: [
    AuthService,
    LoggerService,
    MemberService,
    RandomService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
})
export class CoreModule {

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CoreModule,
      providers: [],
    };
  }

  constructor( @Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(
        'CoreModule is already loaded. Import it in the AppModule only');
    }
  }

}
