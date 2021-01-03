import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YearlyCategorySpendingBarChartComponent } from './category-spending-bar-chart.component';

describe('YearlyCategorySpendingBarChartComponent', () => {
  let component: YearlyCategorySpendingBarChartComponent;
  let fixture: ComponentFixture<YearlyCategorySpendingBarChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ YearlyCategorySpendingBarChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(YearlyCategorySpendingBarChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
