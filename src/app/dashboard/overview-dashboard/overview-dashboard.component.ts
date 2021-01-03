import { Component, OnInit } from "@angular/core";
import { DateService } from "src/app/shared/services/date-services";
import { parse } from 'papaparse'
import { IMoneyFyDataItemDto } from "src/app/shared/models/data-transfer-objects/money-fy-data-item-dto";
import { LocalStorageService } from "src/app/shared/services/local-storage-service";
import { SpendingComparisionBarChartViewModel} from "../spending-comparision-bar-chart/spending-comparision-bar-chart-view-model";
import { SpendingComparisionDonutChartViewModel } from "../spending-comparision-donut-chart/spending-comparision-donut-chart-view-model";
import { MorrisChartService } from "src/app/shared/services/morris-chart/morris-chart.service";


@Component({
  selector: "app-overview-dashboard",
  templateUrl: "./overview-dashboard.component.html",
  styleUrls: ["./overview-dashboard.component.scss"],
})
export class OverviewDashboardComponent implements OnInit {
  public barChartViewModel: SpendingComparisionBarChartViewModel;
  public donutChartViewModel: SpendingComparisionDonutChartViewModel;

  constructor(
    private dateService: DateService,
    private morrisChartService: MorrisChartService,
    private localStorage: LocalStorageService
  ) {    
    this.barChartViewModel = new SpendingComparisionBarChartViewModel(this.dateService, this.morrisChartService);
    this.donutChartViewModel = new SpendingComparisionDonutChartViewModel(this.dateService, this.morrisChartService);       
  }

  ngOnInit(): void {
    this.initBarchart();
    this.initDonutChart();
  }

  private initDonutChart() {

    const savedData = this.localStorage.getMoneyFyData();
    if (!savedData) {

    }
    else {
      this.donutChartViewModel.update(+this.dateService.todaysYear(), savedData);
    }

  }

  private initBarchart() {    
    const savedData = this.localStorage.getMoneyFyData();
    if (!savedData) {
      this.barChartViewModel.reset();
    }
    else {
      this.barChartViewModel.update(savedData);
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

  deleteData(): void{
    alert('Dumbo');
  }

  private updateCharts(data: IMoneyFyDataItemDto[]): void {
    this.barChartViewModel.update(data);
    this.donutChartViewModel.update(+this.dateService.todaysYear(), data);
  }

}
