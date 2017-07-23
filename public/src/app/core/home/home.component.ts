import { Component, OnInit } from '@angular/core';
import { AuthService } from "app/core/services/auth.service";

@Component({
  selector: 'ogk-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public isAuthenticated: boolean;

  constructor(private auth: AuthService) { }

  ngOnInit() {
    this.auth.authStatus.subscribe((isAuthenticated) => {
      this.isAuthenticated = isAuthenticated
    });
  }

  login() {
    this.auth.login();
  }

}
