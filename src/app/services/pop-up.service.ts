import { Injectable } from '@angular/core';
import { NotificationsService } from 'angular2-notifications';

@Injectable({
  providedIn: 'root'
})
export class PopUpService {

  constructor(private serviceNot: NotificationsService) { }
  showSuccess(msg: string): void {
    this.serviceNot.success("Succés", msg, {
      position: ["bottom", "left"],
      timeOut: 5000,
      showProgressBar: true,
      pauseOnHover: true,
      clickToClose: false,
      clickIconToClose: true,
      animate: "fade",
    });
  }
  showFail(msg: string): void {
    this.serviceNot.error("Attention", msg, {
      position: ["bottom", "right"],
      timeOut: 5000,
      showProgressBar: true,
      pauseOnHover: true,
      clickToClose: false,
      clickIconToClose: true,
      animate: "fade",
    });
  }

  showInfo(msg: string): void {
    this.serviceNot.warn("Info", msg, {
      position: ["bottom", "right"],
      timeOut: 5000,
      showProgressBar: true,
      pauseOnHover: true,
      clickToClose: false,
      clickIconToClose: true,
      animate: "fade",
    });
  }
}