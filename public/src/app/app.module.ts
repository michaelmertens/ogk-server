import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { HashLocationStrategy, LocationStrategy } from "@angular/common";
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from "app/core/core.module";
import { SharedModule } from "app/shared/shared.module";
import { ToolsModule } from "./tools/tools.module";
import { GamesModule } from './games/games.module';
import { RootModule } from "app/root/root.module";

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    CoreModule.forRoot(),
    SharedModule,
    GamesModule,
    ToolsModule,
    RootModule,
    AppRoutingModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
