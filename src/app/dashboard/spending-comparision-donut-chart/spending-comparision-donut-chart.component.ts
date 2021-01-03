import { Component, Input, OnInit } from '@angular/core';
import { LocalStorageService } from 'src/app/shared/services/local-storage-service';
import { MorrisChartService } from 'src/app/shared/services/morris-chart/morris-chart.service';
import { SpendingComparisionDonutChartViewModel } from './spending-comparision-donut-chart-view-model';

@Component({
  selector: 'app-spending-comparision-donut-chart',
  templateUrl: './spending-comparision-donut-chart.component.html',
  styleUrls: ['./spending-comparision-donut-chart.component.scss']
})
export class SpendingComparisionDonutChartComponent implements OnInit {


  @Input() viewModel!: SpendingComparisionDonutChartViewModel;
  constructor(private localStorage: LocalStorageService, private chartService: MorrisChartService) { }

  ngOnInit(): void {
  }

  public onYearSelectionChannged(selectedItem: any) {
    this.viewModel.selectedYear = +selectedItem.target.value;
    const data = this.localStorage.getMoneyFyData();
    this.viewModel.update(this.viewModel.selectedYear, data);
  }



}
