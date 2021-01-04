import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { LocalStorageService } from 'src/app/shared/services/local-storage-service';
import { CategorySpendingBarChartViewModel as CategorySpendingBarChartViewModel } from './category-spending-bar-chart-view-model';

@Component({
  selector: 'app-category-spending-bar-chart',
  templateUrl: './category-spending-bar-chart.component.html',
  styleUrls: ['./category-spending-bar-chart.component.scss'],
})
export class YearlyCategorySpendingBarChartComponent implements OnInit {
  @Input() viewModel!: CategorySpendingBarChartViewModel;
  @Output() categoryChanged = new EventEmitter<string>();

  constructor() {}

  ngOnInit(): void {}

  onCategoryChanged(event: any): void {
    const category = event.target.value;
    if (category) {
      this.categoryChanged.emit(category);
    }
  }
}
