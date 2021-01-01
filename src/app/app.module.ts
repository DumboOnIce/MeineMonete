import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';


import { AppRoutingModule } from './app-routing.module';



import {DashboardModule} from './dashboard/dashboard.module';

import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { SideBarComponent } from './components/layout/side-bar/side-bar.component';
import { TopBarComponent } from './components/layout/top-bar/top-bar.component';
import { MorrisChartDirective } from './shared/directives/morris-chart/morris-chart-directive';




@NgModule({
  declarations: [AppComponent, PageNotFoundComponent, SideBarComponent, TopBarComponent],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    DashboardModule   
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
