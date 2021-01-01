import { SummaryResolver } from "@angular/compiler";
import { Injectable } from "@angular/core";
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

}
