import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from "@angular/router";
import { OverviewDashboardComponent } from './overview-dashboard/overview-dashboard.component';
import { MorrisChartDirective } from '../shared/directives/morris-chart/morris-chart-directive';
import { FormsModule } from '@angular/forms';
import { SpendingComparisionBarChartComponent } from './spending-comparision-bar-chart/spending-comparision-bar-chart.component';
import { SpendingComparisionDonutChartComponent } from './spending-comparision-donut-chart/spending-comparision-donut-chart.component';
import { YearlyCategorySpendingBarChartComponent } from './category-spending-bar-chart/category-spending-bar-chart.component';


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
  declarations: [OverviewDashboardComponent, MorrisChartDirective, SpendingComparisionBarChartComponent, SpendingComparisionDonutChartComponent, YearlyCategorySpendingBarChartComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule
  ]
})
export class DashboardModule { }
