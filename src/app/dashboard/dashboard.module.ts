import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from "@angular/router";
import { OverviewDashboardComponent } from './overview-dashboard/overview-dashboard.component';
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
  declarations: [OverviewDashboardComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class DashboardModule { }
