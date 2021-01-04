import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { IMoneyFyDataItemDto } from 'src/app/shared/models/data-transfer-objects/money-fy-data-item-dto';

@Component({
  selector: 'app-money-fy-data-table',
  templateUrl: './money-fy-data-table.component.html',
  styleUrls: ['./money-fy-data-table.component.scss'],
})
export class MoneyFyDataTableComponent implements OnInit, AfterViewInit {
  public displayedColumns: string[] = [
    'date',
    'account',
    'category',
    'description',
    'amount',
    'currency',
  ];

  @Input() dataSource!: MatTableDataSource<IMoneyFyDataItemDto>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor() {
    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit(): void {}

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
