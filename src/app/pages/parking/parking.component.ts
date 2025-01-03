import {Component, OnInit} from '@angular/core';
import {MenuItem} from "primeng/api";
import {SharedService} from "../../services/shared.service";

@Component({
  selector: 'app-parking',
  templateUrl: './parking.component.html',
  styleUrl: './parking.component.scss'
})
export class ParkingComponent implements OnInit {

  constructor(public shared: SharedService) {}

  home: MenuItem | undefined;

  ngOnInit() {
    this.shared.initCrumb({label: 'Parking'});

    this.home = {icon: 'fa-solid fa-house', routerLink: '/'};
  }
}
