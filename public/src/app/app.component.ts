import { Component } from '@angular/core';
import { AuthService } from "app/core/services/auth.service";
@Component({
  selector: 'ogk-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(public auth: AuthService) {
    auth.handleAuthentication();
  }
}
