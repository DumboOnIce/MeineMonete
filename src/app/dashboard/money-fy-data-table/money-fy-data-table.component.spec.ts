import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoneyFyDataTableComponent } from './money-fy-data-table.component';

describe('MoneyFyDataTableComponent', () => {
  let component: MoneyFyDataTableComponent;
  let fixture: ComponentFixture<MoneyFyDataTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MoneyFyDataTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MoneyFyDataTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
