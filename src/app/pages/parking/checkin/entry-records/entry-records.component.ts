import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {SharedService} from "../../../../services/shared.service";

@Component({
  selector: 'app-entry-records',
  templateUrl: './entry-records.component.html',
  styleUrl: './entry-records.component.scss'
})
export class EntryRecordsComponent implements OnInit, OnDestroy {

  @Input() registrations!: Registration[];

  constructor(private shared: SharedService) {
    this.registrations = [
      {
        id: '1',
        licensePlate: 'ABC-123',
        vehicleType: 'CAR',
        entryDate: new Date()
      },
      {
        id: '2',
        licensePlate: 'XYZ-987',
        vehicleType: 'MOTORCYCLE',
        entryDate: new Date()
      }
    ];
  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
  }
}

export interface Registration {
  id: string;
  licensePlate: string;
  vehicleType: string;
  entryDate: Date;
  exitDate?: Date;
  duration?: number;
  rate?: number;
  amount?: number;
}
