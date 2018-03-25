import { Component, OnInit } from '@angular/core';
import { AuthService } from "app/core/services/auth.service";
import { MemberService } from "app/core";
import { Member } from "models/member";

@Component({
  selector: 'ogk-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  host: { 'class': 'container' },
})
export class HomeComponent implements OnInit {
  public isAuthenticated: boolean;
  public name: string;

  constructor(private authSvc: AuthService, private memberSvc: MemberService) { }

  ngOnInit() {
    this.authSvc.authStatus.subscribe((isAuthenticated) => {
      this.isAuthenticated = isAuthenticated;
    });
    this.memberSvc.member.subscribe((member: Member) => {
      if (member) {
        this.name = member.firstName + " " + member.lastName;
      } else {
        this.name = "stranger";
      }
    })
  }

  login() {
    this.authSvc.login();
  }

}
