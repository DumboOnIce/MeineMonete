import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SummerizedFactsTableComponent } from './summerized-facts-table.component';

describe('SummerizedFactsTableComponent', () => {
  let component: SummerizedFactsTableComponent;
  let fixture: ComponentFixture<SummerizedFactsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SummerizedFactsTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SummerizedFactsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
