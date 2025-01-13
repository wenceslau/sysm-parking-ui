import {Component, OnInit} from '@angular/core';
import {SharedService} from "../../../services/shared.service";
import {ParkingService} from "../../../services/parking.service";
import {Registration} from "../@models/models";

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrl: './report.component.scss'
})
export class ReportComponent implements OnInit {

  date: Date = new Date();
  registrations!: Registration[];

  constructor(private sharedSrv: SharedService,
              protected parkingSrv: ParkingService) {
    this.sharedSrv.addCrumb({label: 'Report'}, true);
  }

  ngOnInit() {
    this.onSelectDate(this.date);
  }

  onSelectDate(date: Date) {
    this.date = date;
    this.parkingSrv.report(date).then(r => {
      this.registrations = r;
    });
  }
}
