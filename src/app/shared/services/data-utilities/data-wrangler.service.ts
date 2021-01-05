import { Injectable } from '@angular/core';
import { IMoneyFyDataItemViewModel } from '../../models/view-models/money-fy-data-item-view-model';
import { List } from 'linqts';

@Injectable({
  providedIn: 'root'
})
export class DataWranglerService {

  constructor() { }

  public groupByMonths(data: IMoneyFyDataItemViewModel[]): Map<string, number>  {
    const amountByMonth = new Map<string, number>();
    for (const { month, amount } of data) {
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


  public groupByCategories(data: IMoneyFyDataItemViewModel[]): Map<string, number> {
    const amountByCategory = new Map<string, number>();
    for (const { category, amount } of data) {
      amountByCategory.set(category, (amountByCategory.get(category) || 0) + (+amount)*(-1));
    }
    return amountByCategory;
  }

  public groupByYears(data: IMoneyFyDataItemViewModel[]): Map<string, number> {
    const amountByYear = new Map<string, number>();
    for (const { year, amount } of data) {
      amountByYear.set(year, (amountByYear.get(year) || 0) + (+amount)*(-1));
    }
    return amountByYear;
  }

  public groupByYearsThenMonths(data: IMoneyFyDataItemViewModel[]): Map<string, number> {
    const amountByYearThenMonth = new Map<string, number>();

    const dataList = new List(data);
    const groupedByYears = dataList.GroupBy(x=>x.year);
    for(let year in groupedByYears)
    {
        let groupedByMonths = (new List(groupedByYears[year])).GroupBy(x=>x.month);
        for(let month in groupedByMonths)
        {
          let amount = (new List(groupedByMonths[month])).Sum(x=>x?.amount || 0)
          amountByYearThenMonth.set(`${month}-${year}`, (amount * -1));
        }
    }
    return amountByYearThenMonth;
  }

  public groupByYearsThenByMonthsFilterByCategory(category:string, data: IMoneyFyDataItemViewModel[]): Map<string, number> {
    const amountByYearThenMonth = new Map<string, number>();

    const dataList = new List(data);
    const groupedByYears = dataList.GroupBy(x=>x.year);
    for(let year in groupedByYears)
    {
        let groupedByMonths = (new List(groupedByYears[year])).GroupBy(x=>x.month);
        for(let month in groupedByMonths)
        {
          let amount = (new List(groupedByMonths[month])).Where(x=>x?.category === category).Sum(x=>x?.amount || 0)
          amountByYearThenMonth.set(`${month}-${year}`, (amount * -1));
        }
    }
    return amountByYearThenMonth;
  }


  public getDistinctCategories(data: IMoneyFyDataItemViewModel[]): string[]{
    const dataList = new List(data);
    return dataList?.Select(x=>x.category)?.Distinct()?.OrderBy(x=>x).ToArray();
  }

  public groupByYearsThenByCategories(category:string, data: IMoneyFyDataItemViewModel[]): Map<string, number> {
    const amountCategoriesEachYear= new Map<string, number>();
    const dataList = new List(data);
    const groupByYears = dataList.GroupBy(x=>x.year);

    for(let key in groupByYears)
    {
        let amount = (new List(groupByYears[key])).Where(x=>x?.category===category).Sum(x=>x?.amount || 0);
        amountCategoriesEachYear.set(key, (amountCategoriesEachYear.get(key) || 0) + (+amount)*(-1));
    }

    return amountCategoriesEachYear;
  }

}
