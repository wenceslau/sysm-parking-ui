import {Injectable} from '@angular/core';
import {MenuItem} from "primeng/api";

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  breadcrumbItems: MenuItem[] | undefined;
  entriesCount: number = 0;

  constructor() {
  }

  initCrumb(root: MenuItem) {
    this.breadcrumbItems = [root];
  }

  addCrumb(item: MenuItem) {
    if (!this.breadcrumbItems) {
      this.breadcrumbItems = [];
    }
    this.breadcrumbItems.push(item);
    this.breadcrumbItems = [...this.breadcrumbItems];
  }

  removeCrumb() {
    if (this.breadcrumbItems?.length === 1) {
      return;
    }
    if (this.breadcrumbItems) {
      this.breadcrumbItems.pop();
    }
  }
}
