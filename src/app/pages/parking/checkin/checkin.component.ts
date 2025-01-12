import {Component, OnInit, signal, ViewChild} from "@angular/core";
import {SharedService} from "../../../services/shared.service";
import {ParkingService} from "../../../services/parking.service";
import {ParkedVehicle} from "./entry-records/entry-records.component";

@Component({
  selector: "app-checkin",
  templateUrl: "./checkin.component.html",
  styleUrl: "./checkin.component.scss"
})
export class CheckinComponent implements OnInit {

  @ViewChild('myInputMask') myInputMask: any; //Element Ref for MyInputMask

  licensePlate: string | null = null;

  showVehicleType: boolean = false;
  parkedVehicles: ParkedVehicle[] = [];

  constructor(protected sharedSrv: SharedService,
              protected parkingSrv: ParkingService) {
  }

  ngOnInit() {
    this.sharedSrv.addCrumb({label: "License Plate"}, true);
    this.vehiclesParked();
  }

  onCompleteInput() {
    this.showVehicleType = true;
  }

  onSelectedType(vehicleType: string) {

    let request = {
      licensePlate: this.licensePlate!,
      vehicleType: vehicleType!
    };


    this.parkingSrv.register(request).then(r => {
      if (r.type === "checkIn") {
        this.sharedSrv.information("The vehicle with license plate '" + r.plate + "' has been registered" +
          " with rate: " + r.rate + "€/hour");
      }else if (r.type === "checkOut") {
        this.sharedSrv.information("The vehicle with license plate '" + r.plate + "' has been checked out. " +
          "Duration: "+r.duration+". Amount: " + r.amountToPay + "€");
      }
      this.licensePlate = null;


    }).finally(() => {
      this.showVehicleType = false;
      this.focusInput();
      this.vehiclesParked();

    })


  }

  private vehiclesParked() {

    this.parkingSrv.report().then(r => {

      this.parkedVehicles = r.parkedVehicles;
      this.parkedVehicles.sort((a, b) => b.checkIn.toString().localeCompare(a.checkIn.toString()));

      this.sharedSrv.entriesCount = this.parkedVehicles.length;

    }).catch(() => {
      this.sharedSrv.error("Failed to retrieve parking registrations");

    });
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
