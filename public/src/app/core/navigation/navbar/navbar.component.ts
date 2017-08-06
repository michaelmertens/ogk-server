import { Component, OnInit } from '@angular/core';
import { AuthService } from "app/core/services/auth.service";

@Component({
  selector: 'ogk-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  public isAuthenticated: boolean;
  public showMenu: boolean;

  constructor(private auth: AuthService) { }

  ngOnInit() {
    this.auth.authStatus.subscribe((isAuthenticated) => {
      this.isAuthenticated = isAuthenticated
    });
  }

  login() {
    this.auth.login();
  }

  logout() {
    this.auth.logout();
  }

  toggleMenu() {
    this.showMenu = !this.showMenu;
  }
}
