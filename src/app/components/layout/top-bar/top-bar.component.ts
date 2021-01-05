import { Component, OnInit } from '@angular/core';
import { ToastNotificationservice } from 'src/app/shared/notifications/toast-notification.service';
import { LocalStorageService } from 'src/app/shared/services/local-storage-service';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent implements OnInit {

  constructor(private localStorage: LocalStorageService, private notification: ToastNotificationservice) {

  }

  ngOnInit(): void {
  }

  public deleteCache(): void{
      this.localStorage.deleteMoneyFyData();
      this.notification.showError("Sämtliche Daten aus dem Cache gelöscht.", "Gelöscht!");
  }

}
