import {Injectable} from '@angular/core';
import {MenuItem} from "primeng/api";

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  parkingOpened: boolean = false;
  parkingCapacity: string = '-';
  loggedIn: boolean = false;

  breadcrumbItems: MenuItem[] = [];
  entriesCount: number = 0;

  constructor() {
  }

  initBreadcrumb() {
    this.breadcrumbItems = [];
  }

  addCrumb(item: MenuItem, removeLast: boolean = false) {
    if (removeLast) {
      this.removeCrumb();
    }
    this.breadcrumbItems.push(item);
    this.breadcrumbItems = [...this.breadcrumbItems];
  }

  removeCrumb() {
    if (this.breadcrumbItems?.length > 1) {
      this.breadcrumbItems?.pop();
    }
    this.breadcrumbItems = [...this.breadcrumbItems];
  }
}
