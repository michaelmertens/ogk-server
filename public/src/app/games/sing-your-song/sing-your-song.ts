import { Component } from '@angular/core';
import { MemberService, RandomService } from "app/core";
import { IMember } from "app/models";

@Component({
  selector: 'ogk-sing-your-song',
  templateUrl: 'sing-your-song.html'
})
export class SingYourSong {
  public currentSong: Song;
  public currentMember: IMember;
  private songCollection: Array<Song>;

  constructor(
    private memberService: MemberService, 
    private randomService: RandomService) {
    
    // used for an example of ngFor and navigation
    this.songCollection = [
      { artist: 'Carly Rae Jepsen', title: 'Call Me Maybe' },
      { artist: 'Idina Mendez', title: 'Let it go (Frozen)' },
      { artist: 'Will Smith', title: 'Fresh Prince of Bel Air' },
      { artist: 'Linkin Park', title: 'Numb' }
    ];
  }

  public spinWheel(): void {
    this.currentSong = this.randomService.getRandomItem(this.songCollection);
    this.currentMember = this.randomService.getRandomItem(this.memberService.getEveryone());
  }
}

class Song {
    public artist: string;
    public title: string;
}