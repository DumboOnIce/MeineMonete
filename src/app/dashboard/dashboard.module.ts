import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from "@angular/router";
import { OverviewDashboardComponent } from './overview-dashboard/overview-dashboard.component';
import { MorrisChartDirective } from '../shared/directives/morris-chart/morris-chart-directive';
import { FormsModule } from '@angular/forms';


const routes: Routes = [
  {
    path: "",
    component: OverviewDashboardComponent,
    pathMatch: "full"
  },
  {
    path: "dashboard",
    component: OverviewDashboardComponent,
  },
];

@NgModule({
  declarations: [OverviewDashboardComponent, MorrisChartDirective],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule
  ]
})
export class DashboardModule { }
