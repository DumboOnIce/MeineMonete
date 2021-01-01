import { SummaryResolver } from "@angular/compiler";
import { Injectable } from "@angular/core";
import { moneyFyDateFormat } from "../../consants";
import { IMoneyFyDataItemDto } from "../../models/data-transfer-objects/money-fy-data-item-dto";
import { ICompareableBarChartDataModel } from "../../models/morris-chart/compareable-bar-chart-model";
import { IMoneyFyDataItemViewModel } from "../../models/view-models/money-fy-data-item-view-model";
import { DateService } from "../date-services";


@Injectable({
  providedIn: "root",
})
export class MorrisBarChartService{

  constructor(private dateService: DateService){

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
    const lastYearNumber: string = (+this.dateService.todaysYear()-1).toString();

    const data = this.mapDataToViewModel(dtos);

    
    const thisYear = data.filter(x=>x.year === thisYearNumber &&  x.amount < 0);
    const amountByMonthThisYear = this.groupByMonths(thisYear);
    
    const lastYear = data.filter(x=>x.year === lastYearNumber && x.amount < 0);
    const amountByMonthLastYear = this.groupByMonths(lastYear);

    for(let i=1; i<13; i++)
    {
      let month = i.toString();
      let valueOfThisYear = amountByMonthThisYear.get(month) || 0;
      let valueOfLastYear = amountByMonthLastYear.get(month) || 0; 
      
      results.push({x:month, a: Math.round((valueOfThisYear + Number.EPSILON) * 100) / 100, b: Math.round((valueOfLastYear + Number.EPSILON) * 100) / 100});
    }

    return results;

  }

  private mapDataToViewModel(moneyFyDataFromBackend: IMoneyFyDataItemDto[]): IMoneyFyDataItemViewModel[] {
    return moneyFyDataFromBackend.map((item) => {
  
      const result : IMoneyFyDataItemViewModel = {
        ...item,
        day: this.dateService.getDay(item.date, moneyFyDateFormat),
        year: this.dateService.getYear(item.date, moneyFyDateFormat),
        month: this.dateService.getMonth(item.date, moneyFyDateFormat)
      };
      return result;
    });
  }


  private groupByMonths(dataOfOneYear: IMoneyFyDataItemViewModel[]) {
    const amountByMonth = new Map<string, number>();
    for (const { month, amount } of dataOfOneYear) {
      amountByMonth.set(month, (amountByMonth.get(month) || 0) + (+amount)*(-1));
    }

    /* Default-Werte auffüllen. */
    for(let i=1; i<13; i++)
    {
      let month = i.toString();
      let amount = amountByMonth.get(month);
      if(!amount)
      {
        amountByMonth.set(month, 0);
      }
    }

    return amountByMonth;
  }

}
