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

  constructor(private sharedSrv : SharedService) {
  }

  ngOnInit() {
    this.sharedSrv.addCrumb({label: 'Vehicle Types'});
  }

  selectType() {
    this.sharedSrv.removeCrumb();
    this.onSelectedType.emit(this.vehicleType);
  }

  onHide() {
    this.sharedSrv.removeCrumb();
    this.onHideType.emit();
  }

}
