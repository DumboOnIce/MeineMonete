import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { DateService } from "src/app/shared/services/date-services";
import { MorrisBarChartService } from "src/app/shared/services/morris-chart/morris-bar-chart.service";
import { parse } from 'papaparse'
import { IMoneyFyDataItemDto } from "src/app/shared/models/data-transfer-objects/money-fy-data-item-dto";
import { ICompareableBarChartDataModel } from "src/app/shared/models/morris-chart/compareable-bar-chart-model";


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

  public donutChartData: any; 
  public donutChartOptions: any;

  constructor(
    private router: Router,
    private dateService: DateService,
    private barChartService: MorrisBarChartService
  ) {
    this.thisYearsNumber = +this.dateService.todaysYear();
    this.lastYearsNumber = this.thisYearsNumber -1;
    this.barChartOptions = this.barChartService.createComparableBarChartOptions(this.thisYearsNumber.toString(), this.lastYearsNumber.toString());
    this.barChartData = [{x:'1', a: 0, b: 0}];


    this.donutChartOptions = {
      resize: true
    };
    
    this.donutChartData =  [
      {label: "Download Sales", value: 12},
      {label: "In-Store Sales", value: 30},
      {label: "Mail-Order Sales", value: 20},
      {label: "Download Sales", value: 12},
      {label: "In-Store Sales", value: 30},
      {label: "Mail-Order Sales", value: 20},
      {label: "Download Sales", value: 12},
      {label: "In-Store Sales", value: 30},
      {label: "Mail-Order Sales", value: 20},
      {label: "Download Sales", value: 12},
      {label: "In-Store Sales", value: 30},
      {label: "Mail-Order Sales", value: 20},
      {label: "Download Sales", value: 12},
      {label: "In-Store Sales", value: 30},
      {label: "Mail-Order Sales", value: 2},
    ];

  }

  ngOnInit(): void {
  }

  loadData(input: HTMLInputElement):void{
    if(input.files)
    {
      var reader = new FileReader();
      reader.onload = () => {
          const csv:string = reader.result as string;
          parse(csv,{
            header: true,
            delimiter: ';',
            skipEmptyLines: true,
            complete: (result,file) => {
              this.updateCharts(result);                       
            }
         })

      };
      reader.readAsText(input.files[0]);
    }  
  }



  private updateCharts(result: any): void {
    const data: IMoneyFyDataItemDto[] =  result.data as IMoneyFyDataItemDto[];
    const comparableData = this.barChartService.createComparableBarChartData(data);
    this.barChartData = comparableData;    
    comparableData.forEach(x=>{
      this.sumOfThisYear+=x.a;
      this.sumOfLastYear+=x.b;
    })
  }
}
