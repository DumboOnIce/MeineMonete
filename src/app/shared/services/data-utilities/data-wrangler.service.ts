import { Injectable } from '@angular/core';
import { IMoneyFyDataItemViewModel } from '../../models/view-models/money-fy-data-item-view-model';

@Injectable({
  providedIn: 'root'
})
export class DataWranglerService {

  constructor() { }

  public groupByMonths(dataOfOneYear: IMoneyFyDataItemViewModel[]) {
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
