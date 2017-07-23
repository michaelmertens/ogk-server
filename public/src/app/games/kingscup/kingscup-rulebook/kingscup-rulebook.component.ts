import { Component, OnInit, Input } from '@angular/core';
import { IKingsCupRulebook } from "models/api-contracts/kingscup";

@Component({
  selector: 'ogk-kingscup-rulebook',
  templateUrl: './kingscup-rulebook.component.html',
  styleUrls: ['./kingscup-rulebook.component.scss']
})
export class KingscupRulebookComponent implements OnInit {

  @Input() rulebook: IKingsCupRulebook;
  public editMode: boolean = false;

  constructor() { }

  ngOnInit() {
  }

}
