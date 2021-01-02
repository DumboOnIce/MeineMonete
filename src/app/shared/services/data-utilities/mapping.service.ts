import { Injectable } from '@angular/core';
import { moneyFyDateFormat } from '../../consants';
import { IMoneyFyDataItemDto } from '../../models/data-transfer-objects/money-fy-data-item-dto';
import { IMoneyFyDataItemViewModel } from '../../models/view-models/money-fy-data-item-view-model';
import { DateService } from '../date-services';

@Injectable({
  providedIn: 'root'
})
export class MappingService {

  constructor(private dateService: DateService) { }

  public mapMoneyFyDtoToViewModel(moneyFyDataFromBackend: IMoneyFyDataItemDto[]): IMoneyFyDataItemViewModel[] {
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
}
