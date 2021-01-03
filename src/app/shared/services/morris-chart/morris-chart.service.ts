import { Injectable } from "@angular/core";
import { DefaultCategoryName } from "../../consants";
import { IMoneyFyDataItemDto } from "../../models/data-transfer-objects/money-fy-data-item-dto";
import { IBarChartDataModel } from "../../models/morris-chart/bar-chart-data-model";
import { ICompareableBarChartDataModel } from "../../models/morris-chart/compareable-bar-chart-data-model";
import { IDonutChartDataModel } from "../../models/morris-chart/donut-chart-data-model";
import { IMoneyFyDataItemViewModel } from "../../models/view-models/money-fy-data-item-view-model";
import { DataWranglerService } from "../data-utilities/data-wrangler.service";
import { MappingService } from "../data-utilities/mapping.service";
import { DateService } from "../date-services";


@Injectable({
  providedIn: "root",
})
export class MorrisChartService {

  constructor(private dateService: DateService, private dataWrangler: DataWranglerService, private mapping: MappingService) {

  }

  public createBarChartOptions(label: string): any {
    return {
      xkey: "x",
      ykeys: ["a"],
      labels: [label],
      resize: true,
    };
  }

  public createYearlyBarChartData(categoryName: string, dtos: IMoneyFyDataItemDto[]): IBarChartDataModel[] {
    let results: Array<IBarChartDataModel> = [];
    const data = this.mapping.mapMoneyFyDtoToViewModel(dtos);
    let amountByYear: Map<string, number>=new Map();
    if (categoryName === DefaultCategoryName) {
       amountByYear = this.dataWrangler.groupByYears(data);
    }
    else{
       amountByYear = this.dataWrangler.groupByCategoriesEachYear(categoryName, data);
    }    
    amountByYear.forEach((value, key) => {
      results.push({ x: key, a: value });
    });

    return results;
  }


  public createComparableBarChartOptions(firstLabel: string, secondLabel: string): any {
    return {
      xkey: "x",
      ykeys: ["a", "b"],
      labels: [firstLabel, secondLabel],
      resize: true,
    };
  }

  /**
  * Erzeuge Datenreihen für Balken-Diagramme mit einem Vorjahres-Vergleich
  * @param dtos Ausgelesene Daten aus der CSV-Datei.
  */
  public createComparableBarChartData(dtos: IMoneyFyDataItemDto[]): ICompareableBarChartDataModel[] {
    let results: Array<ICompareableBarChartDataModel> = [];
    const data = this.mapping.mapMoneyFyDtoToViewModel(dtos);

    const thisYear = this.filterDataByYear(+this.dateService.todaysYear(), data);
    const amountByMonthThisYear = this.dataWrangler.groupByMonths(thisYear);

    const lastYear = this.filterDataByYear(+this.dateService.getNumberOfYearFromToday(-1), data);
    const amountByMonthLastYear = this.dataWrangler.groupByMonths(lastYear);

    for (let i = 1; i < 13; i++) {
      let month = i.toString();
      let valueOfThisYear = amountByMonthThisYear.get(month) || 0;
      let valueOfLastYear = amountByMonthLastYear.get(month) || 0;

      results.push({ x: month, a: this.roundUp(valueOfThisYear), b: this.roundUp(valueOfLastYear) });
    }

    return results;
  }

  public createDonutChartDataForCategoriesOfOneYear(year: number, dtos: IMoneyFyDataItemDto[]): IDonutChartDataModel[] {
    let results: Array<IDonutChartDataModel> = [];
    const data = this.filterDataByYear(year, this.mapping.mapMoneyFyDtoToViewModel(dtos));
    const groupedByCategories = this.dataWrangler.groupByCategories(data);

    groupedByCategories.forEach((value, key) => {
      results.push({ label: key, value: this.roundUp(value) });
    });

    return results = results.sort((a, b) => { return a.label.localeCompare(b.label); });
  }


  private filterDataByYear(year: number, data: IMoneyFyDataItemViewModel[]) {
    const thisYear = data.filter(x => x.year === year.toString() && x.amount < 0);
    return thisYear;
  }

  private roundUp(valueOfThisYear: number): number {
    return Math.round((valueOfThisYear + Number.EPSILON) * 100) / 100;
  }
}
