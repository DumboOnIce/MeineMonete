import { Component, Input, OnInit } from '@angular/core';
import { LocalStorageService } from 'src/app/shared/services/local-storage-service';
import { YearlyCategorySpendingBarChartViewModel as CategorySpendingBarChartViewModel } from './category-spending-bar-chart-view-model';

@Component({
  selector: 'app-category-spending-bar-chart',
  templateUrl: './category-spending-bar-chart.component.html',
  styleUrls: ['./category-spending-bar-chart.component.scss']
})
export class YearlyCategorySpendingBarChartComponent implements OnInit {

  @Input() viewModel!: CategorySpendingBarChartViewModel;

  constructor(private localStorage: LocalStorageService) { }

  ngOnInit(): void {
  }

  onCategoryChanged(event:any):void{
    const category = event.target.value;
    if(category)
    {
      this.viewModel.selectedCategory = category;
      const savedData = this.localStorage.getMoneyFyData();
      if (!savedData) {
        this.viewModel.init();
      }
      else {
        this.viewModel.update(savedData)
      }          
    }
  }

}
