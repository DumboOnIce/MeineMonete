import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { DateService } from "src/app/shared/services/date-services";
import { MorrisBarChartService } from "src/app/shared/services/morris-chart/morris-bar-chart.service";

@Component({
  selector: "app-overview-dashboard",
  templateUrl: "./overview-dashboard.component.html",
  styleUrls: ["./overview-dashboard.component.scss"],
})
export class OverviewDashboardComponent implements OnInit {
  public barChartData: any;
  public barChartOptions: any;
  public thisYearsNumber: number = 0;
  public sumOfThisYear: number = 0;  
  public lastYearsNumber: number = 0;
  public sumOfLastYear: number = 0;

  constructor(
    private router: Router,
    private dateService: DateService,
    private barChartService: MorrisBarChartService
  ) {
  }

  ngOnInit(): void {
    this.barChartOptions = this.barChartService.createComparableBarChartOptions("Dieses Jahr", "Letztes Jahr");
    this.barChartData = [{x:'1', a: 0, b: 0}];
    this.thisYearsNumber = +this.dateService.todaysYear();
    this.lastYearsNumber = this.thisYearsNumber -1;
  }

 



}
