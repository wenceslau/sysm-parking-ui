import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-vehicle-type',
  templateUrl: './vehicle-type.component.html',
  styleUrl: './vehicle-type.component.scss'
})
export class VehicleTypeComponent {

  @Input() visible: boolean = true;
  @Output() onSelectedType = new EventEmitter();
  @Output() onHideType = new EventEmitter();


  vehicleType: string | null = null;
  vehicleTypes: string[] = ['CAR', 'MOTORCYCLE', 'TRUCK'];

  selectType() {
    this.onSelectedType.emit(this.vehicleType);
  }

  onHide() {
    this.onHideType.emit();
  }

}
