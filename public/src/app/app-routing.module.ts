import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GameRoutes } from "app/games/games.module";
import { ToolsRoutes } from "app/tools/tools.module";
import { RootRoutes } from "app/root/root.module";
import { CallbackComponent } from "app/core/callback/callback.component";
import { HomeComponent } from "app/core/home/home.component";

const routes: Routes = [
  { path: 'callback', component: CallbackComponent },
  { path: 'home', component: HomeComponent },
  { path: 'games', children: GameRoutes },
  { path: 'tools', children: ToolsRoutes },
  { path: '', children: RootRoutes },  
  { path: '**', redirectTo: 'home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
