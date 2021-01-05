import { Injectable } from '@angular/core';
import { List } from 'linqts';
import { ISummerizedFactsTableViewModel } from 'src/app/dashboard/summerized-facts-table/summerized-facts-table-view-model';
import { IMoneyFyDataItemViewModel } from '../../models/view-models/money-fy-data-item-view-model';
import { roundUp } from '../math';

@Injectable({
  providedIn: 'root',
})
export class FactsCalculationService {
  public calcTotalFacts(
    dataList: List<IMoneyFyDataItemViewModel>,
    numberOfYears: number,
    numberOfMonths: number
  ): ISummerizedFactsTableViewModel {
    let totalSpendings = dataList.Select((x) => x.amount).Sum();
    let averageCostEachYear = 0;
    if (numberOfYears > 0) {
      averageCostEachYear = totalSpendings / numberOfYears;
    }

    let averageCostEachMonth = 0;
    if (numberOfMonths > 0) {
      averageCostEachMonth = totalSpendings / numberOfMonths;
    }

    let allCategoryFacts: ISummerizedFactsTableViewModel = {
      category: 'Alle Ausgaben',
      totalAmount: roundUp(totalSpendings),
      averageCostEachMonth: roundUp(averageCostEachMonth),
      averageCostEachYear: roundUp(averageCostEachYear),
    };
    return allCategoryFacts;
  }

  public calcGroupedCategoryFacts(
    dataList: List<IMoneyFyDataItemViewModel>,
    numberOfYears: number,
    numberOfMonths: number
  ): ISummerizedFactsTableViewModel[] {
    if (numberOfMonths === 0) numberOfMonths = 1;

    if (numberOfYears === 0) numberOfYears = 1;

    let results: ISummerizedFactsTableViewModel[] = [];

    let groupedByCategories = dataList.GroupBy((x) => x.category);
    for (let key in groupedByCategories) {
      let sumEachCategory = 0;
      groupedByCategories[key]?.forEach((x) => {
        sumEachCategory += +x.amount;
      });

      const averageMonth = sumEachCategory / numberOfMonths;
      const averageYear = sumEachCategory / numberOfYears;
      results.push({
        category: key,
        averageCostEachMonth: roundUp(averageMonth),
        averageCostEachYear: roundUp(averageYear),
        totalAmount: roundUp(sumEachCategory),
      });
    }

    return results;
  }
}
