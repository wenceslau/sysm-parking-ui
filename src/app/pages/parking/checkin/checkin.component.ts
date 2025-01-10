import {Component, OnInit, signal, ViewChild} from "@angular/core";
import {Registration} from "./entry-records/entry-records.component";
import {SharedService} from "../../../services/shared.service";

@Component({
  selector: "app-checkin",
  templateUrl: "./checkin.component.html",
  styleUrl: "./checkin.component.scss"
})
export class CheckinComponent implements OnInit {

  @ViewChild('myInputMask') myInputMask: any; //Element Ref for MyInputMask

  licensePlate: string | null = null;

  showVehicleType: boolean = false;
  registrations: Registration[] = [];

  constructor(protected sharedSrv: SharedService) {
  }

  ngOnInit() {
    this.sharedSrv.addCrumb({label: "License Plate"}, true);
  }

  onCompleteInput() {
    this.showVehicleType = true;
  }

  onSelectedType(vehicleType: string) {

    this.registrations.push({
      id: this.registrations.length.toString(),
      licensePlate: this.licensePlate!,
      vehicleType: vehicleType!,
      entryDate: new Date()
    })
    this.sharedSrv.entriesCount = this.registrations.length;

    const messageContent = "The vehicle with license plate '" + this.licensePlate + "' and type '" + vehicleType + "' has been registered";
    this.licensePlate = null;
    this.showVehicleType = false;

    this.focusInput();
    this.sharedSrv.information(messageContent);
  }

  onHideType() {

    const messageContent = "The vehicle with license plate '" + this.licensePlate + "' has not been registered";
    this.licensePlate = null;
    this.showVehicleType = false;

    this.focusInput();
    this.sharedSrv.warning(messageContent);
  }

  focusInput() {
    setTimeout(() => {
      console.log("Focus input");
      this.myInputMask.el.nativeElement.childNodes[0].focus();
    }, 100);
  }
}
