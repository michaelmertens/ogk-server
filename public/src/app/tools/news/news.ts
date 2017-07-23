import { Component } from '@angular/core';

@Component({
  selector: 'ogk-news',
  templateUrl: 'news.html',
  styleUrls: ['./news.scss']
})
export class News {

  newsStories: Array<{title: string, content: any}>;

  constructor() {
    this.newsStories = [
      { title: "Eerste nieuws op onze nieuwe app!", content: "Dit is geweldig." },
      { title: "Bestemming eerste weekend ligt vast!", content: "Kijken jullie er ook al naar uit?" }
    ];
  }

}