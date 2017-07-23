import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IKingsCupResponse, IKingsCupRulebook } from "models/api-contracts/kingscup";

@Component({
  selector: 'ogk-kingscup',
  templateUrl: './kingscup.component.html',
  styleUrls: ['./kingscup.component.scss']
})
export class KingscupComponent implements OnInit {
  public rulebooks: IKingsCupRulebook[];
  public selectedRuleBook: IKingsCupRulebook;

  constructor(private http: HttpClient) { }

  ngOnInit() {

    this.http.get('http://localhost:8080/api/games/kingscup').subscribe((games: IKingsCupResponse) => {
      this.rulebooks = games._embedded.rulebooks;
    })

  }

  openRuleBook(rb: IKingsCupRulebook) {
    this.selectedRuleBook = rb;
  }

}