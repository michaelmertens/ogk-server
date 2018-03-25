import { NgModule } from '@angular/core';
import { ChineseVolunteer } from "./chinese-volunteer/chinese-volunteer";
import { SharedModule } from "app/shared/shared.module";
import { News } from "app/tools/news/news";
import { Members } from "app/tools/members/members";
import { Routes } from "@angular/router";
import { EventsComponent } from './events/events.component';
import { DagboekComponent } from './dagboek/dagboek.component';

@NgModule({
  imports: [
    SharedModule,
  ],
  declarations: [
    Members,
    News,
    ChineseVolunteer,
    EventsComponent,
    DagboekComponent,
  ],
})
export class ToolsModule { }
export const ToolsRoutes: Routes = [
  { path: "news", component: News },
  { path: "dagboek", component: DagboekComponent },
  { path: "events", component: EventsComponent },
  { path: "members", component: Members },
  { path: "chinese-volunteer", component: ChineseVolunteer },
];
