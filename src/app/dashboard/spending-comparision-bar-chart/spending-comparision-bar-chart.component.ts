import { Component, Input, OnInit } from '@angular/core';
import { SpendingComparisionBarChartViewModel } from './spending-comparision-bar-chart-view-model';

@Component({
  selector: 'app-spending-comparision-bar-chart',
  templateUrl: './spending-comparision-bar-chart.component.html',
  styleUrls: ['./spending-comparision-bar-chart.component.scss']
})
export class SpendingComparisionBarChartComponent implements OnInit {


  @Input() viewModel!: SpendingComparisionBarChartViewModel;

  constructor() { }

  ngOnInit(): void {
  }

}
