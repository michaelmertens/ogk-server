import { Component } from '@angular/core';

import { IMember } from "app/models";
import { MemberService, RandomService } from "app/core";

@Component({
  selector: 'chinese-volunteer',
  templateUrl: 'chinese-volunteer.html'
})
export class ChineseVolunteer {
  members: ViewModel[];
  chosenMember: string = "..";

  constructor(
    private memberService: MemberService, 
    private randomService: RandomService) {
      this.members = memberService.getEveryone().map(m => {
        return {
          member: m,
          active: true
        }
      });
  }

  public go(): void {
    let m = this.randomService.getRandomItem(this.members.filter(m => m.active)).member;
    this.chosenMember = m.firstName + " " + m.lastName + ", Ik kies jou!";
  }
}

interface ViewModel {
  member: IMember;
  active: boolean;
}