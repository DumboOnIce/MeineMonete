import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpendingComparisionBarChartComponent } from './spending-comparision-bar-chart.component';

describe('SpendingComparisionBarChartComponent', () => {
  let component: SpendingComparisionBarChartComponent;
  let fixture: ComponentFixture<SpendingComparisionBarChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpendingComparisionBarChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpendingComparisionBarChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
