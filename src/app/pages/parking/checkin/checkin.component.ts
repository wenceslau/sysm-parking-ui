import {AfterViewChecked, Component, ElementRef, OnInit, signal, ViewChild} from "@angular/core";
import {MessageService} from "primeng/api";
import {Registration} from "./entry-records/entry-records.component";
import {SharedService} from "../../../services/shared.service";

@Component({
  selector: "app-checkin",
  templateUrl: "./checkin.component.html",
  styleUrl: "./checkin.component.scss"
})
export class CheckinComponent implements OnInit {

  @ViewChild('myInputMask') myInputMask: any; //Element Ref for MyInputMask

  messageVisible = signal(false);

  licensePlate: string | null = null;
  messageType: string = "info";
  messageContent: string = "";

  showVehicleType: boolean = false;
  registrations: Registration[] = [];

  constructor(private shared: SharedService) {
  }

  ngOnInit() {
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
    this.shared.entriesCount = this.registrations.length;

    this.licensePlate = null;
    this.showVehicleType = false;
    this.messageContent = "The vehicle with license plate '" + this.licensePlate + "' and type '" + vehicleType + "' has been registered";

    this.showMessage("success");
  }

  onHideType() {

    this.licensePlate = null;
    this.showVehicleType = false;
    this.messageContent = "The vehicle with license plate '" + this.licensePlate + "' has not been registered";

    this.showMessage("warn");
  }

  showMessage(type: string) {
    this.focusInput();
    this.messageType = type;
    this.messageVisible.set(true);

    setTimeout(() => {
      this.messageType = "info";
      this.messageContent = "";
      this.messageVisible.set(false);

    }, (1000 * 3));
  }

  focusInput() {
    setTimeout(() => {
      console.log("Focus input");
      this.myInputMask.el.nativeElement.childNodes[0].focus();
    }, 100);
  }
}
