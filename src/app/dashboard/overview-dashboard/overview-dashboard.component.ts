import { Component, OnInit } from '@angular/core';
import { DateService } from 'src/app/shared/services/date-services';
import { parse } from 'papaparse';
import { IMoneyFyDataItemDto } from 'src/app/shared/models/data-transfer-objects/money-fy-data-item-dto';
import { LocalStorageService } from 'src/app/shared/services/local-storage-service';
import { SpendingComparisionBarChartViewModel } from '../spending-comparision-bar-chart/spending-comparision-bar-chart-view-model';
import { SpendingComparisionDonutChartViewModel } from '../spending-comparision-donut-chart/spending-comparision-donut-chart-view-model';
import { MorrisChartService } from 'src/app/shared/services/morris-chart/morris-chart.service';
import { DataWranglerService } from 'src/app/shared/services/data-utilities/data-wrangler.service';
import { MappingService } from 'src/app/shared/services/data-utilities/mapping.service';
import { CategorySpendingBarChartViewModel } from '../category-spending-bar-chart/category-spending-bar-chart-view-model';
import { DefaultCategoryName } from 'src/app/shared/constants';
import { MatTableDataSource } from '@angular/material/table';
import { ISummerizedFactsTableViewModel } from '../summerized-facts-table/summerized-facts-table-view-model';
import { FactsCalculationService } from 'src/app/shared/services/data-utilities/facts-calculation.service';
import { ToastNotificationservice } from 'src/app/shared/notifications/toast-notification.service';

@Component({
  selector: 'app-overview-dashboard',
  templateUrl: './overview-dashboard.component.html',
  styleUrls: ['./overview-dashboard.component.scss'],
})
export class OverviewDashboardComponent implements OnInit {
  public comparableBarChart: SpendingComparisionBarChartViewModel;
  public compareableDonutChart: SpendingComparisionDonutChartViewModel;
  public yearlyCategoryBarChart: CategorySpendingBarChartViewModel;
  public monthlyCategoryBarChart: CategorySpendingBarChartViewModel;
  public tableDataSource!: MatTableDataSource<IMoneyFyDataItemDto>;
  public summerizedTableDataSource!: MatTableDataSource<ISummerizedFactsTableViewModel>;

  constructor(
    private dateService: DateService,
    private morrisChartService: MorrisChartService,
    private localStorage: LocalStorageService,
    private dataWrangler: DataWranglerService,
    private mappingService: MappingService,
    private factsCalculation: FactsCalculationService,
    private notificationService: ToastNotificationservice
  ) {
    this.comparableBarChart = new SpendingComparisionBarChartViewModel(
      this.dateService,
      this.morrisChartService
    );
    this.compareableDonutChart = new SpendingComparisionDonutChartViewModel(
      this.dateService,
      this.morrisChartService
    );
    this.yearlyCategoryBarChart = new CategorySpendingBarChartViewModel();
    this.yearlyCategoryBarChart.title = 'Jährliche Ausgabe';
    this.monthlyCategoryBarChart = new CategorySpendingBarChartViewModel();
    this.monthlyCategoryBarChart.title = 'Monatliche Ausgabe';
    this.tableDataSource = new MatTableDataSource();
    this.summerizedTableDataSource = new MatTableDataSource();
  }

  ngOnInit(): void {
    const savedData = this.localStorage.getMoneyFyData();
    if (!savedData) {
      this.compareableDonutChart.init();
      this.comparableBarChart.init();
      this.yearlyCategoryBarChart.init();
    } else {
      this.updateUi(savedData);
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
          complete: (result) => {
            const data = (result.data as IMoneyFyDataItemDto[]).filter(
              (x) => x.amount < 0
            );
            this.localStorage.saveMoneyFyData(data);
            this.updateUi(data);
            this.notificationService.showSuccess("Datei wurde erfolgreich geladen!","Daten geladen!");
          },
        });
      };
      if (input.files.length > 0) {
        reader.readAsText(input.files[0]);
      }
      else{
        this.notificationService.showWarning("Das Laden wurde abgebrochen!","Abgebrochen!");
      }
    }
  }

  private updateUi(data: IMoneyFyDataItemDto[]): void {
    this.comparableBarChart.update(data);
    this.compareableDonutChart.update(+this.dateService.todaysYear(), data);
    this.updateYearlyCategoryBarChart(DefaultCategoryName, data);
    this.updateMonthlyCategoryBarChart(DefaultCategoryName, data);
    this.tableDataSource.data = data;
    this.summerizedTableDataSource.data = this.factsCalculation.calculateSummerizedFacts(data);
  }



  // ######################## Yearly-Category-Bar-Chart ########################
  yearlyCategoryChanged(category: string): void {
    this.updateYearlyCategoryBarChart(
      category,
      this.localStorage.getMoneyFyData()
    );
  }
  private updateYearlyCategoryBarChart(
    categoryName: string,
    savedData: IMoneyFyDataItemDto[]
  ) {
    this.yearlyCategoryBarChart.barChartSelectableCategories = this.dataWrangler.getDistinctCategories(
      this.mappingService.mapMoneyFyDtoToViewModel(savedData)
    );
    this.yearlyCategoryBarChart.barChartSelectableCategories.push('ALLE');
    this.yearlyCategoryBarChart.barChartOptions = this.morrisChartService.createBarChartOptions(
      'Ausgaben in Euro'
    );
    this.yearlyCategoryBarChart.barChartData = this.morrisChartService.createYearlyBarChartData(
      categoryName,
      savedData
    );
  }
  // ######################## Yearly-Category-Bar-Chart ########################

  // ######################## Monthly-Category-Bar-Chart ########################
  monthlyCategoryChanged(category: string): void {
    this.updateMonthlyCategoryBarChart(
      category,
      this.localStorage.getMoneyFyData()
    );
  }
  private updateMonthlyCategoryBarChart(
    categoryName: string,
    savedData: IMoneyFyDataItemDto[]
  ) {
    this.monthlyCategoryBarChart.barChartSelectableCategories = this.dataWrangler.getDistinctCategories(
      this.mappingService.mapMoneyFyDtoToViewModel(savedData)
    );
    this.monthlyCategoryBarChart.barChartSelectableCategories.push('ALLE');
    this.monthlyCategoryBarChart.barChartOptions = this.morrisChartService.createBarChartOptions(
      'Ausgaben in Euro'
    );
    this.monthlyCategoryBarChart.barChartData = this.morrisChartService.createMonthlyBarChartData(
      categoryName,
      savedData
    );
  }
  // ######################## Monthly-Category-Bar-Chart ########################
}
