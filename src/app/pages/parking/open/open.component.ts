import {Component, OnInit} from '@angular/core';
import {SharedService} from "../../../services/shared.service";
import {Router} from "@angular/router";
import {FormControl, FormGroup} from "@angular/forms";
import {ConfirmationService} from "primeng/api";
import {ParkingService} from "../../../services/parking.service";

@Component({
  selector: 'app-open',
  templateUrl: './open.component.html',
  styleUrl: './open.component.scss'
})
export class OpenComponent implements OnInit {

  formGroup!: FormGroup;

  constructor(private sharedSrv: SharedService,
              private parkingSrv: ParkingService,
              private confirmationService: ConfirmationService,
              private router: Router) {
    this.formGroup = new FormGroup({
      value: new FormControl(10)
    });
  }

  ngOnInit() {
    this.sharedSrv.addCrumb({label: 'Open Gate'}, true);
  }

  open(event: Event) {
    if (this.parkingSrv.isOpen) {
      this.confirmationService.confirm({
        target: event.target as EventTarget,
        header: 'Parking is already opened',
        message: 'This action will change the capacity. Do you want to proceed?',
        accept: () => {
          this.openGate();
        }
      });
    } else {
      this.openGate();
    }
  }

  openGate() {
    let capacity = this.formGroup.value.value;

    this.parkingSrv.open(capacity).then(() => {
      this.parkingSrv.setOpen();
      this.sharedSrv.success('Parking gate opened successfully');
      this.router.navigate(['parking', 'checkin']);
    }).catch(err => {
      this.sharedSrv.error('Failed to open parking gate');
    });

  }

}
