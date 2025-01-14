import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {CheckInVehicle} from "../../@models/models";

@Component({
  selector: 'app-entry-records',
  templateUrl: './entry-records.component.html',
  styleUrl: './entry-records.component.scss'
})
export class EntryRecordsComponent implements OnInit, OnDestroy {

  @Input() parkedVehicles!: CheckInVehicle[];

  constructor() {
  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
  }
}
