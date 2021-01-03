import { IMoneyFyDataItemDto } from "src/app/shared/models/data-transfer-objects/money-fy-data-item-dto";
import { DataWranglerService } from "src/app/shared/services/data-utilities/data-wrangler.service";
import { MappingService } from "src/app/shared/services/data-utilities/mapping.service";
import { MorrisChartService } from "src/app/shared/services/morris-chart/morris-chart.service";

export class YearlyCategorySpendingBarChartViewModel{
    public barChartOptions: any;
    public barChartData: any;
    public barChartSelectableCategories: string[] =[];
    public selectedCategory!: string;


    constructor(private dataWrangler:DataWranglerService,  private morrisChartService: MorrisChartService, private mappingService: MappingService) {
        this.init();               
    }


    public init() {
        this.barChartSelectableCategories.push("ALLE");
        this.selectedCategory = "ALLE";
      }

      public update(data: IMoneyFyDataItemDto[]) {
        this.barChartSelectableCategories = this.dataWrangler.getDistinctCategories(this.mappingService.mapMoneyFyDtoToViewModel(data));
        this.barChartSelectableCategories.push("ALLE");      
        this.barChartOptions = this.morrisChartService.createBarChartOptions("Ausgaben in Euro");
        this.barChartData = this.morrisChartService.createYearlyBarChartData(this.selectedCategory, data);
      }
}