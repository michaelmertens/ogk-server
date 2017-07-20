import {
  ModuleWithProviders,
  NgModule,
  Optional,
  SkipSelf,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LoggerService } from './services/logger.service';
import { MemberService } from './services/member.service';
import { RandomService } from './services/random.service';
import { NavbarComponent } from './navigation/navbar/navbar.component';
import { SharedModule } from "app/shared/shared.module";

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
  ],
  providers: [
    LoggerService,
    MemberService,
    RandomService,
  ],
})
export class CoreModule {

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CoreModule,
      providers: [],
    };
  }

  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(
        'CoreModule is already loaded. Import it in the AppModule only');
    }
  }

}
