import {Component, OnInit} from '@angular/core';
import {MenuItem} from "primeng/api";
import {SharedService} from "../../services/shared.service";
import {Router} from "@angular/router";
import {ParkingService} from "../../services/parking.service";

@Component({
  selector: 'app-parking',
  templateUrl: './parking.component.html',
  styleUrl: './parking.component.scss'
})
export class ParkingComponent implements OnInit {

  constructor(public sharedSrv: SharedService,
              public parkingSrv: ParkingService,
              private router: Router) {
  }

  sideMenuItems: MenuItem[] = [];
  homeMenuItem: MenuItem | undefined;

  ngOnInit() {
    this.initSideMenu();
    this.sharedSrv.addCrumb({label: 'Parking'}, true, true);
    this.homeMenuItem = {icon: 'fa-solid fa-house', routerLink: '/'};

    if (this.parkingSrv.parkingOpened) {
      this.router.navigate(['parking/checkin']);
    }
  }

  initSideMenu() {
    this.sideMenuItems = [
      {
        label: 'Open Gate',
        icon: 'fa-regular fa-circle-play',
        badge: '#parkingOpened',
        command: () => this.router.navigate(['parking/open'])
      },
      {
        label: 'License Plate',
        icon: 'fa-solid fa-check-double',
        badge: '#entriesCount',
        command: () => this.router.navigate(['parking/checkin'])
      },
      {
        label: 'Reports',
        icon: 'fa-solid fa-chart-bar',
        shortcut: '⌘+R',
        expanded: true,
        items: [
          {
            label: 'Checkin/Checkout',
            command: () => this.router.navigate(['parking/report'])
          }
        ]
      },
    ];
  }

}
