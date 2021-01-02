import { Injectable } from "@angular/core";
import * as moment from 'moment';

@Injectable({
  providedIn: "root",
})
export class DateService {
  constructor() {}

  public today(): Date{
    return moment().toDate();
  }

  public todaysYear(): string{
    return moment().format('YYYY');
  }

  public getNumberOfYearFromToday(yearNumber: number): string
  {
    return (+this.todaysYear()+yearNumber).toString();
  }
  

  public getMonth(date: string, format: string): string{
    const check = moment(date, format);
    const result = check.format('M');
    return result;
  }

  public getDay(date: string, format: string): string{
    const check = moment(date, format);
    const result = check.format('D');
    return result;
  }

  public getYear(date: string, format: string): string{
    const check = moment(date, format);
    const result = check.format('YYYY');
    return result;
  }

}
