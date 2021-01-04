import { Component, OnInit } from "@angular/core";
import { DateService } from "src/app/shared/services/date-services";
import { parse } from 'papaparse'
import { IMoneyFyDataItemDto } from "src/app/shared/models/data-transfer-objects/money-fy-data-item-dto";
import { LocalStorageService } from "src/app/shared/services/local-storage-service";
import { SpendingComparisionBarChartViewModel } from "../spending-comparision-bar-chart/spending-comparision-bar-chart-view-model";
import { SpendingComparisionDonutChartViewModel } from "../spending-comparision-donut-chart/spending-comparision-donut-chart-view-model";
import { MorrisChartService } from "src/app/shared/services/morris-chart/morris-chart.service";
import { DataWranglerService } from "src/app/shared/services/data-utilities/data-wrangler.service";
import { MappingService } from "src/app/shared/services/data-utilities/mapping.service";
import { CategorySpendingBarChartViewModel } from "../category-spending-bar-chart/category-spending-bar-chart-view-model";
import { DefaultCategoryName } from "src/app/shared/consants";


@Component({
  selector: "app-overview-dashboard",
  templateUrl: "./overview-dashboard.component.html",
  styleUrls: ["./overview-dashboard.component.scss"],
})
export class OverviewDashboardComponent implements OnInit {
  public comparableBarChart: SpendingComparisionBarChartViewModel;
  public compareableDonutChart: SpendingComparisionDonutChartViewModel;
  public yearlyCategoryBarChart: CategorySpendingBarChartViewModel;


  constructor(
    private dateService: DateService,
    private morrisChartService: MorrisChartService,
    private localStorage: LocalStorageService,
    private dataWrangler: DataWranglerService,
    private mappingService: MappingService
  ) {
    this.comparableBarChart = new SpendingComparisionBarChartViewModel(this.dateService, this.morrisChartService);
    this.compareableDonutChart = new SpendingComparisionDonutChartViewModel(this.dateService, this.morrisChartService);
    this.yearlyCategoryBarChart = new CategorySpendingBarChartViewModel();
    this.yearlyCategoryBarChart.title ="Jährliche Ausgabe";
  }

  ngOnInit(): void {
    const savedData = this.localStorage.getMoneyFyData();
    if (!savedData) {
      this.compareableDonutChart.init();
      this.comparableBarChart.init();
      this.yearlyCategoryBarChart.init();
    }
    else {
      this.compareableDonutChart.update(+this.dateService.todaysYear(), savedData);
      this.comparableBarChart.update(savedData);
      this.updateYearlyCategoryBarChart(DefaultCategoryName, savedData);
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
            const data = (result.data as IMoneyFyDataItemDto[]).filter(x => x.amount < 0);
            this.localStorage.saveMoneyFyData(data);
            this.updateCharts(data);
          }
        })
      };
      reader.readAsText(input.files[0]);
    }
  }


  private updateCharts(data: IMoneyFyDataItemDto[]): void {
    this.comparableBarChart.update(data);
    this.compareableDonutChart.update(+this.dateService.todaysYear(), data);
    this.updateYearlyCategoryBarChart(DefaultCategoryName, data);
  }


  // ######################## Yearly-Category-Bar-Chart ########################
  yearlyCategoryChanged(category: string):void{
    this.updateYearlyCategoryBarChart(category, this.localStorage.getMoneyFyData());
  }
  private updateYearlyCategoryBarChart(categoryName: string, savedData: IMoneyFyDataItemDto[]) {
    this.yearlyCategoryBarChart.barChartSelectableCategories = this.dataWrangler.getDistinctCategories(this.mappingService.mapMoneyFyDtoToViewModel(savedData));
    this.yearlyCategoryBarChart.barChartSelectableCategories.push("ALLE");
    this.yearlyCategoryBarChart.barChartOptions = this.morrisChartService.createBarChartOptions("Ausgaben in Euro");
    this.yearlyCategoryBarChart.barChartData = this.morrisChartService.createYearlyBarChartData(categoryName, savedData);
  }
    // ######################## Yearly-Category-Bar-Chart ########################
}
