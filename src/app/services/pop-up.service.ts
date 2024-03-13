import { Injectable } from '@angular/core';
import { NotificationsService } from 'angular2-notifications';

@Injectable({
  providedIn: 'root'
})
export class PopUpService {

  constructor(private serviceNot: NotificationsService) { }
  showSuccess(msg:any){
    this.serviceNot.success("Succés",msg, {
     position:["bottom","left"],
     timeOut: 5000,
     showProgressBar: true,
     pauseOnHover: true,
     clickToClose: false,
     clickIconToClose: true,
     animate:"fade",
   });
 }
  showFail(msg:any){
    this.serviceNot.error("Erreur",msg, {
     position:["bottom","right"],
     timeOut: 5000,
     showProgressBar: true,
     pauseOnHover: true,
     clickToClose: false,
     clickIconToClose: true,
     animate:"fade",
   });
 }
}