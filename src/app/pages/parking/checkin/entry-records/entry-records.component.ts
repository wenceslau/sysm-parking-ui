import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-entry-records',
  templateUrl: './entry-records.component.html',
  styleUrl: './entry-records.component.scss'
})
export class EntryRecordsComponent {

  @Input() registrations!: Registration[];

  constructor() {
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
}

export interface Registration {
  id: string;
  licensePlate: string;
  vehicleType: string;
  entryDate: Date;
//  exitDate: Date;
}
