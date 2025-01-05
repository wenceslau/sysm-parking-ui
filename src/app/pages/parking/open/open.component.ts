import {Component, OnInit} from '@angular/core';
import {SharedService} from "../../../services/shared.service";
import {Router} from "@angular/router";
import {FormControl, FormGroup} from "@angular/forms";
import {ConfirmationService} from "primeng/api";

@Component({
  selector: 'app-open',
  templateUrl: './open.component.html',
  styleUrl: './open.component.scss'
})
export class OpenComponent implements OnInit {

  formGroup!: FormGroup;

  constructor(private shared: SharedService,
              private confirmationService: ConfirmationService,
              private router: Router) {
    this.formGroup = new FormGroup({
      value: new FormControl(10)
    });
  }

  ngOnInit() {
    this.shared.addCrumb({label: 'Open Gate'}, true);
  }

  open(event: Event) {
    if (this.shared.parkingOpened) {
      this.confirmationService.confirm({
        target: event.target as EventTarget,
        header: 'Parking is already opened',
        message: 'This action will change the capacity. Do you want to proceed?',
        accept: () => {
          this.openGate();
        }
      });
    }else {
      this.openGate();
    }

  }

  openGate() {
    this.shared.parkingCapacity =  this.formGroup.value.value;
    this.shared.parkingOpened = true;
    this.router.navigate(['parking','checkin']);
  }

}
