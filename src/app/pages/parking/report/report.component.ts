import { Component } from '@angular/core';
import {SharedService} from "../../../services/shared.service";
import {Registration} from "../checkin/entry-records/entry-records.component";

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrl: './report.component.scss'
})
export class ReportComponent {

  registrations!: Registration[];

  constructor(private sharedSrv : SharedService) {
    this.sharedSrv.addCrumb({label: 'Report'}, true);
  }

}
