import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { AuthService } from "app/core/services/auth.service";
import { BehaviorSubject } from "rxjs/Rx";
import { IMember, IGetMembersResponse } from "models/api-contracts/members";
import { environment } from "environments/environment";

@Injectable()
export class MemberService {
  public member: BehaviorSubject<IMember>;
  private memberCollection: Array<IMember> = [];

  constructor(private auth: AuthService, private http: HttpClient) {
    this.member = new BehaviorSubject<IMember>(null);
    this.auth.memberId.subscribe((value) => {
      if (!value) {
        this.member.next(null);
        return;
      }

      this.http.get(environment.apiBaseUrl +'/api/members').subscribe((resp: IGetMembersResponse) => {
        this.memberCollection = resp._embedded.members;
        this.member.next(this.memberCollection.find((m) => m.id.toLowerCase() === value.toLowerCase()));
      });
    });
  }

  public getEveryone(): Array<IMember> {
    return this.memberCollection;
  }

  public getRandomMember(): IMember {
    let randomIdx = Math.floor(Math.random() * (this.memberCollection.length));
    return this.memberCollection[randomIdx];
  }
}