
export class CategorySpendingBarChartViewModel{
    public barChartOptions: any;
    public barChartData: any;
    public barChartSelectableCategories: string[] =[];
    public selectedCategory!: string;
    public title!:string;


    constructor() {
        this.init();
    }


    public init() {
        this.barChartSelectableCategories.push("ALLE");
        this.selectedCategory = "ALLE";
      }

}
