import { IMoneyFyDataItemDto } from "src/app/shared/models/data-transfer-objects/money-fy-data-item-dto";
import { DateService } from "src/app/shared/services/date-services";
import { MorrisChartService } from "src/app/shared/services/morris-chart/morris-chart.service";

export class SpendingComparisionBarChartViewModel{    
    public barChartData: any;
    public barChartOptions: any;
    public thisYearsNumber: number = 0;
    public sumOfThisYear: number = 0;
    public lastYearsNumber: number = 0;
    public sumOfLastYear: number = 0;   

    constructor(private dateService: DateService, private barChartService: MorrisChartService) {
        this.thisYearsNumber = +this.dateService.todaysYear();
        this.lastYearsNumber = this.thisYearsNumber - 1;
        this.barChartOptions = this.barChartService.createComparableBarChartOptions(
          this.thisYearsNumber.toString(),
          this.lastYearsNumber.toString());
    }

    public reset(): void{
        this.barChartData = [{ x: '1', a: 0, b: 0 }];
        this.sumOfThisYear = 0;
        this.sumOfLastYear = 0;
    }

    public update(data: IMoneyFyDataItemDto[]):void {
        const comparableData = this.barChartService.createComparableBarChartData(data);
        this.barChartData = comparableData;
        this.sumOfLastYear = 0;
        this.sumOfThisYear = 0;
        comparableData.forEach(x => {
          this.sumOfThisYear += x.a;
          this.sumOfLastYear += x.b;
        });
      }
}