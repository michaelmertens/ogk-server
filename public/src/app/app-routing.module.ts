import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GameRoutes } from "app/games/games.module";
import { ToolsRoutes } from "app/tools/tools.module";

const routes: Routes = [
  {
    path: '',
    children: []
  },
  {
    path: 'games',
    children: GameRoutes
  },
  {
    path: 'tools',
    children: ToolsRoutes
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
