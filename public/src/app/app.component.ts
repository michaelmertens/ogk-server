import { Component } from '@angular/core';
import { AuthService } from "app/core/services/auth.service";
import { MemberService } from "app/core";
@Component({
  selector: 'ogk-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(public auth: AuthService, public members: MemberService) {
    auth.handleAuthentication();
  }
}
