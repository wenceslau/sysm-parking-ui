import {Component, OnInit, signal, ViewChild} from "@angular/core";
import {SharedService} from "../../../services/shared.service";
import {ParkingService} from "../../../services/parking.service";
import {CheckOutVehicle, CheckInVehicle} from "../@models/models";

@Component({
  selector: "app-checkin",
  templateUrl: "./checkin.component.html",
  styleUrl: "./checkin.component.scss"
})
export class CheckinComponent implements OnInit {

  @ViewChild('myInputMask') myInputMask: any; //Element Ref for MyInputMask

  licensePlate: string | null = null;

  showVehicleType: boolean = false;
  checkInVehicles: CheckInVehicle[] = [];
  checkOutVehicles: CheckOutVehicle[] = [];


  constructor(protected sharedSrv: SharedService,
              protected parkingSrv: ParkingService) {
    parkingSrv.status();
  }

  ngOnInit() {
    this.sharedSrv.addCrumb({label: "License Plate"}, true);
    this.checkInReport();
    this.checkOutReport();
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
        this.sharedSrv.information("The vehicle with license plate '" + r.plate + "' has been registered " +
          "with rate: " + r.rate + " €/hour");
      }else if (r.type === "checkOut") {
        this.sharedSrv.information("The vehicle with license plate '" + r.plate + "' has been checked out. " +
          "Duration: "+r.duration+". Amount: " + r.amountToPay + "€");
      }
      this.licensePlate = null;


    }).finally(() => {
      this.showVehicleType = false;
      this.focusInput();
      this.checkInReport();
      this.checkOutReport();

    })


  }

  private checkInReport() {

    this.parkingSrv.checkInReport().then(response => {

      this.checkInVehicles = response;
      this.checkInVehicles.sort((a, b) => b.checkIn.toString().localeCompare(a.checkIn.toString()));

      this.sharedSrv.entriesCount = this.checkInVehicles.length;

    }).catch((r) => {
      console.log(r);
      this.sharedSrv.error("Failed to retrieve parking registrations checkIn");

    });
  }

  private checkOutReport() {

    this.parkingSrv.checkOutReport().then(response => {

      this.checkOutVehicles = response;
      this.checkOutVehicles.sort((a, b) => b.checkOut.toString().localeCompare(a.checkOut.toString()));

    }).catch(() => {
      this.sharedSrv.error("Failed to retrieve parking registrations checkOut");

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
