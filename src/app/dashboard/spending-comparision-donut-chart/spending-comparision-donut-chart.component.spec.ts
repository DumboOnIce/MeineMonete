import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpendingComparisionDonutChartComponent } from './spending-comparision-donut-chart.component';

describe('SpendingComparisionDonutChartComponent', () => {
  let component: SpendingComparisionDonutChartComponent;
  let fixture: ComponentFixture<SpendingComparisionDonutChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpendingComparisionDonutChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpendingComparisionDonutChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
