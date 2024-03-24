import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SortingService {

  constructor() { }

  public sortList<T>(list: T[], column: keyof T, sortOrder: 'ASC' | 'DESC'): T[] {
    return list.slice().sort((a, b) => {
      if (sortOrder == 'ASC')
        return a[column] < b[column] ? -1 : 1;
      else
        return a[column] > b[column] ? -1 : 1;
    })
  }

  public isSorted<T>(list: T[], column: keyof T, sortOrder: 'ASC' | 'DESC'): boolean {
    const sortedList = this.sortList(list, column, sortOrder);
    return this.arraysAreEqual(list, sortedList);
  }

  private arraysAreEqual<T>(arr1: T[], arr2: T[]): boolean {
    if (arr1.length !== arr2.length)
      return false;

    for (let i = 0; i < arr1.length; i++)
      if (arr1[i] !== arr2[i])
        return false;

    return true;
  }
}

