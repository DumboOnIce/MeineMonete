import { IMoneyFyDataItemDto } from "src/app/shared/models/data-transfer-objects/money-fy-data-item-dto";
import { DateService } from "src/app/shared/services/date-services";
import { MorrisChartService } from "src/app/shared/services/morris-chart/morris-chart.service";

export class SpendingComparisionDonutChartViewModel {
    public donutChartData: any;
    public donutChartOptions: any;
    public sumOfCategories: number = 0;
    public selectableYears: Array<number> = [];
    public selectedYear: number;

    constructor(private dateService: DateService, private chartService: MorrisChartService) {
        this.selectedYear = +this.dateService.todaysYear();

        this.donutChartOptions = {
            resize: true
        };
        this.selectableYears.push(+this.dateService.todaysYear());
        this.selectableYears.push(+this.dateService.todaysYear() - 1);
    }

    public init(): void{
        this.donutChartData = [
            { label: "Nichts", value: 100 },
          ];
    }

    public update(year: number, data: IMoneyFyDataItemDto[]) {
        const donutChartData = this.chartService.createDonutChartDataForCategoriesOfOneYear(year, data);
        this.donutChartData = donutChartData;
        donutChartData.forEach(x => {
          this.sumOfCategories += x.value;
        });
      }
}
