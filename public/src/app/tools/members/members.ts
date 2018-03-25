import { Component } from '@angular/core';
import { MemberService } from "app/core/services/member.service";
import { IMember } from "models/api-contracts/members";

@Component({
  selector: 'ogk-members',
  templateUrl: 'members.html',
  styleUrls: ['./members.scss']
})
export class Members {

  members: IViewModel[];

  constructor(
    public memberService: MemberService
  ) {
    this.members = memberService.getEveryone().sort((a, b) => {
      if (a.lastName < b.lastName) return -1; 
      if (a.lastName > b.lastName) return 1; 
      return 0;
    }).map(m => {
      return {
        expand: false,
        member: m
      };
    });
  }

}

interface IViewModel {
  expand: boolean;
  member: IMember;
}