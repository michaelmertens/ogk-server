import { Component } from '@angular/core';
import { MemberService } from "app/core";
import { Member } from "app/models";

@Component({
  selector: 'ogk-members',
  templateUrl: 'members.html'
})
export class Members {

  members: IViewModel[];

  constructor(
    public memberService: MemberService
  ) {
    this.members = memberService.getEveryone().map(m => {
      return {
        expand: false,
        member: m
      };
    });
  }

}

interface IViewModel {
  expand: boolean;
  member: Member;
}