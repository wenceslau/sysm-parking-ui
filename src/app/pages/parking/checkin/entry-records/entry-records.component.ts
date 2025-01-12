import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {SharedService} from "../../../../services/shared.service";

@Component({
  selector: 'app-entry-records',
  templateUrl: './entry-records.component.html',
  styleUrl: './entry-records.component.scss'
})
export class EntryRecordsComponent implements OnInit, OnDestroy {

  @Input() parkedVehicles!: ParkedVehicle[];

  constructor() {
  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
  }
}

export interface Registration {
  parkedVehicles: ParkedVehicle[];
  checkoutVehicles: CheckoutVehicle[];
}

export interface ParkedVehicle {
  plate: string;
  checkIn: Date;
}

export interface CheckoutVehicle {
  plate: string;
  checkOut: Date;
  duration: number;
  amount: number;
}
