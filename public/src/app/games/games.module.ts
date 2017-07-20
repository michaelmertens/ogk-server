import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EightBall } from "./eight-ball/eight-ball";
import { SingYourSong } from "./sing-your-song/sing-your-song";
import { SharedModule } from "app/shared/shared.module";
import { Routes } from "@angular/router";

@NgModule({
  imports: [
    SharedModule,
    CommonModule
  ],
  declarations: [
    SingYourSong,
    EightBall,
  ]
})
export class GamesModule { }
export const GameRoutes: Routes = [
  { path: "sing-your-song", component: SingYourSong },
  { path: "8ball", component: EightBall },
];

