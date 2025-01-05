import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {SharedService} from "../../../../services/shared.service";

@Component({
  selector: 'app-vehicle-type',
  templateUrl: './vehicle-type.component.html',
  styleUrl: './vehicle-type.component.scss'
})
export class VehicleTypeComponent implements OnInit {

  @Input() visible: boolean = true;
  @Output() onSelectedType = new EventEmitter();
  @Output() onHideType = new EventEmitter();

  vehicleType: string | null = null;
  vehicleTypes: string[] = ['CAR', 'MOTORCYCLE', 'TRUCK'];

  constructor(private shared : SharedService) {
  }

  ngOnInit() {
    this.shared.addCrumb({label: 'Vehicle Types'});
  }

  selectType() {
    this.shared.removeCrumb();
    this.onSelectedType.emit(this.vehicleType);
  }

  onHide() {
    this.shared.removeCrumb();
    this.onHideType.emit();
  }

}
