import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { DateService } from "src/app/shared/services/date-services";
import { MorrisBarChartService } from "src/app/shared/services/morris-chart/morris-bar-chart.service";
import { parse } from 'papaparse'
import { IMoneyFyDataItemDto } from "src/app/shared/models/data-transfer-objects/money-fy-data-item-dto";
import { LocalStorageService } from "src/app/shared/services/local-storage-service";


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
  public sumOfCategories: number = 0;
  public selectableYears: Array<number> = [];
  public selectedYear: number;

  constructor(
    private router: Router,
    private dateService: DateService,
    private barChartService: MorrisBarChartService,
    private localStorage: LocalStorageService
  ) {
    this.selectedYear = +this.dateService.todaysYear();
  }

  ngOnInit(): void {
    this.initBarchart();
    this.initDonutChart();
  }

  private initDonutChart() {
    this.donutChartOptions = {
      resize: true
    };

    this.selectableYears.push(+this.dateService.todaysYear());
    this.selectableYears.push(+this.dateService.todaysYear() - 1);

    const savedData = this.localStorage.getMoneyFyData();
    if (!savedData) {
      this.donutChartData = [
        { label: "Nichts", value: 100 },
      ];
    }
    else {
      this.updateCategoryDonutChart(+this.dateService.todaysYear(), savedData);
    }

  }

  private initBarchart() {
    this.thisYearsNumber = +this.dateService.todaysYear();
    this.lastYearsNumber = this.thisYearsNumber - 1;
    this.barChartOptions = this.barChartService.createComparableBarChartOptions(this.thisYearsNumber.toString(), this.lastYearsNumber.toString());

    const savedData = this.localStorage.getMoneyFyData();
    if (!savedData) {
      this.barChartData = [{ x: '1', a: 0, b: 0 }];
      this.sumOfThisYear = 0;
      this.sumOfLastYear = 0;
    }
    else {
      this.updateBarChart(savedData);
    }


  }


  loadData(input: HTMLInputElement): void {
    if (input.files) {
      var reader = new FileReader();
      reader.onload = () => {
        const csv: string = reader.result as string;
        parse(csv, {
          header: true,
          delimiter: ';',
          skipEmptyLines: true,
          complete: (result, file) => {
            this.localStorage.saveMoneyFyData(result.data as IMoneyFyDataItemDto[]);
            this.updateCharts(result.data as IMoneyFyDataItemDto[]);
          }
        })

      };
      reader.readAsText(input.files[0]);
    }
  }



  public onYearSelectionChannged(selectedItem: any) {
    this.selectedYear = +selectedItem.target.value;
    const data = this.localStorage.getMoneyFyData();
    this.updateCategoryDonutChart(this.selectedYear, data);
  }



  private updateCharts(data: IMoneyFyDataItemDto[]): void {
    this.updateBarChart(data);
    this.updateCategoryDonutChart(+this.dateService.todaysYear(), data);
  }

  private updateBarChart(data: IMoneyFyDataItemDto[]) {
    const comparableData = this.barChartService.createComparableBarChartData(data);
    this.barChartData = comparableData;
    comparableData.forEach(x => {
      this.sumOfThisYear += x.a;
      this.sumOfLastYear += x.b;
    });
  }

  private updateCategoryDonutChart(year: number, data: IMoneyFyDataItemDto[]) {
    const donutChartData = this.barChartService.createDonutChartDataForCategoriesOfOneYear(year, data);
    this.donutChartData = donutChartData;
    donutChartData.forEach(x => {
      this.sumOfCategories += x.value;
    });
  }
}
