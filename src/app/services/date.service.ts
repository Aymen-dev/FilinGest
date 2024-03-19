import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateService {

  constructor() { }

  formatDate(date: Date): string {
    const month = date.getMonth();
    const months = [
      'janvier', 'février', 'mars', 'avril', 'mai', 'juin',
      'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'
    ];
    return date.getDate() + ' ' + months[month] + ' ' + date.getFullYear();
  }
}
