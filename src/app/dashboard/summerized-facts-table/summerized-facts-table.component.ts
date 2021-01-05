import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ISummerizedFactsTableViewModel } from './summerized-facts-table-view-model';

@Component({
  selector: 'app-summerized-facts-table',
  templateUrl: './summerized-facts-table.component.html',
  styleUrls: ['./summerized-facts-table.component.scss'],
})
export class SummerizedFactsTableComponent implements OnInit , AfterViewInit{
  public displayedColumns: string[] = [
    'category',
    'totalAmount',
    'averageCostEachMonth',
    'averageCostEachYear'
  ];

  @Input() dataSource!: MatTableDataSource<ISummerizedFactsTableViewModel>;
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
