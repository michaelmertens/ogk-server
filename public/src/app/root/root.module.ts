import { NgModule } from '@angular/core';
import { Routes } from "@angular/router";
import { SharedModule } from "app/shared/shared.module";
import { UnderReviewComponent } from './under-review/under-review.component';

@NgModule({
  declarations: [UnderReviewComponent],
  imports: [
    SharedModule,
  ],
})
export class RootModule { }
export const RootRoutes: Routes = [
  { path: "under-review", component: UnderReviewComponent },
];
