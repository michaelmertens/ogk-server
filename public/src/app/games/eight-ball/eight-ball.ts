import { Component } from '@angular/core';
import { RandomService } from "app/core";

@Component({
  selector: 'ogk-eight-ball',
  templateUrl: 'eight-ball.html'
})
export class EightBall {
  public currentAnswer: string;
  public newResponse: string;
  private answerCollection: Array<{text: string}>;

  constructor(
    public randomService: RandomService) {
    
    // used for an example of ngFor and navigation
    this.answerCollection = [
      { text: 'Yes' },
      { text: 'No' },
      { text: 'No way!' },
      { text: 'Maybe tonight' },
      { text: 'Almost certainly' },
      { text: 'How should I know?' },
      { text: 'Zijt gij da jekke?!' }
    ];
  }

  public shakeBall(): void {
    this.currentAnswer = "shaking...";
    setTimeout(() => {
        this.currentAnswer = this.randomService.getRandomItem(this.answerCollection).text;
    }, 1000);
  }

  public addNewResponse(response: string) {
    
  }
}
