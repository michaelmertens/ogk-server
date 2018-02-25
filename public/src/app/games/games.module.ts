import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EightBall } from "./eight-ball/eight-ball";
import { SingYourSong } from "./sing-your-song/sing-your-song";
import { SharedModule } from "app/shared/shared.module";
import { Routes } from "@angular/router";
import { KingscupComponent } from './kingscup/kingscup.component';
import { KingscupRulebookComponent } from './kingscup/kingscup-rulebook/kingscup-rulebook.component';
import { VomitComponent } from './vomit/vomit.component';

@NgModule({
  imports: [
    SharedModule,
    CommonModule
  ],
  declarations: [
    SingYourSong,
    EightBall,
    KingscupComponent,
    KingscupRulebookComponent,
    VomitComponent,
  ]
})
export class GamesModule { }
export const GameRoutes: Routes = [
  { path: "sing-your-song", component: SingYourSong },
  { path: "8ball", component: EightBall },
  { path: "kings-cup", component: KingscupComponent },
];

