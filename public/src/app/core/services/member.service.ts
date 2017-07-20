import { Injectable } from '@angular/core';
import { Member } from "app/models";

@Injectable()
export class MemberService {
  private memberCollection: Array<Member>;

  constructor() {    
    this.memberCollection = [
      { firstName: 'Michael', lastName: 'Mertens' },
      { firstName: 'Tom', lastName: 'Meyns' },
      { firstName: 'Bernard', lastName: 'Spitz' },
      { firstName: 'Tom', lastName: 'Hendrix' },
      { firstName: 'Karel', lastName: 'Mangeleer' },
      { firstName: 'Jens', lastName: 'Vande Cavey' },
      { firstName: 'Nico', lastName: 'Vansina' },
      { firstName: 'Vincent', lastName: 'Pieters' },
      { firstName: 'Evert', lastName: 'Baeten' },
      { firstName: 'Neil', lastName: 'Rayyan' },
      { firstName: 'Ludo', lastName: 'Aelbrecht' }
    ];
  }

  public getEveryone(): Array<Member> {
    return this.memberCollection;
  }

  public getRandomMember(): Member {
    let randomIdx = Math.floor(Math.random() * (this.memberCollection.length));
    return this.memberCollection[randomIdx];
  }
}