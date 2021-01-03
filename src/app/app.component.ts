import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public currentYear: number;
  title = 'ShowMeMore';

  constructor(){
    this.currentYear = new Date().getFullYear();
  }
}
