import { SummaryResolver } from "@angular/compiler";
import { Injectable } from "@angular/core";
import { moneyFyDateFormat } from "../../consants";
import { IMoneyFyDataItemDto } from "../../models/data-transfer-objects/money-fy-data-item-dto";
import { ICompareableBarChartDataModel } from "../../models/morris-chart/compareable-bar-chart-model";
import { IMoneyFyDataItemViewModel } from "../../models/view-models/money-fy-data-item-view-model";
import { DataWranglerService } from "../data-utilities/data-wrangler.service";
import { MappingService } from "../data-utilities/mapping.service";
import { DateService } from "../date-services";


@Injectable({
  providedIn: "root",
})
export class MorrisBarChartService{

  constructor(private dateService: DateService, private dataWrangler: DataWranglerService, private mapping: MappingService){

  }


  public createComparableBarChartOptions(firstLabel: string, secondLabel: string):any{
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
  public createComparableBarChartData(dtos: IMoneyFyDataItemDto[]):ICompareableBarChartDataModel[]
  { 
    let results: Array<ICompareableBarChartDataModel> = [];

    const thisYearNumber:string = this.dateService.todaysYear();
    const lastYearNumber: string = this.dateService.getNumberOfYearFromToday(-1);

    const data = this.mapping.mapMoneyFyDtoToViewModel(dtos);

    
    const thisYear = data.filter(x=>x.year === thisYearNumber &&  x.amount < 0);
    const amountByMonthThisYear = this.dataWrangler.groupByMonths(thisYear);
    
    const lastYear = data.filter(x=>x.year === lastYearNumber && x.amount < 0);
    const amountByMonthLastYear = this.dataWrangler.groupByMonths(lastYear);

    for(let i=1; i<13; i++)
    {
      let month = i.toString();
      let valueOfThisYear = amountByMonthThisYear.get(month) || 0;
      let valueOfLastYear = amountByMonthLastYear.get(month) || 0; 
      
      results.push({x:month, a: this.roundUp(valueOfThisYear), b: this.roundUp(valueOfLastYear)});
    }

    return results;

  }


  private roundUp(valueOfThisYear: number): number {
    return Math.round((valueOfThisYear + Number.EPSILON) * 100) / 100;
  }
}
