import { Injectable } from '@angular/core';
import { Member } from "app/models";
import { HttpClient } from "@angular/common/http";
import { AuthService } from "app/core/services/auth.service";
import { BehaviorSubject } from "rxjs/Rx";
import { IGetMembersResponse } from "models/api-contracts/members";

@Injectable()
export class MemberService {
  public member: BehaviorSubject<Member>;
  private memberCollection: Array<Member>;

  constructor(private auth: AuthService, private http: HttpClient) {
    this.member = new BehaviorSubject<Member>(null);
    this.auth.memberId.subscribe((value) => {
      if (!value) {
        this.member.next(null);
        return;
      }

      this.http.get('/api/members').subscribe((resp: IGetMembersResponse) => {
        this.memberCollection = resp._embedded.members;
        this.member.next(this.memberCollection.find((m) => m.id === value));
      });
    });
  }

  public getEveryone(): Array<Member> {
    return this.memberCollection;
  }

  public getRandomMember(): Member {
    let randomIdx = Math.floor(Math.random() * (this.memberCollection.length));
    return this.memberCollection[randomIdx];
  }
}