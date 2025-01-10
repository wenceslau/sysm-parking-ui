import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {MenuItem, MessageService} from "primeng/api";
import {SharedService} from "../../../services/shared.service";
import {ParkingService} from "../../../services/parking.service";

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrl: './side-menu.component.scss'
})
export class SideMenuComponent implements OnInit, OnDestroy{

  @Input() items: MenuItem[] = [];
  @Input() customBadge: string = '';

  constructor(private sharedSrv: SharedService,
              private parkingSrv: ParkingService,
              private router: Router,
              private route: ActivatedRoute) {

    route.params.subscribe(params => console.log("side menu id parameter", params['id']));
  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
  }

  navigate(path: string, name?: string) {
    this.router.navigate(['parking/' + path]);
  }

  getBadgeValue(item: MenuItem) : string {
    if (!item.badge){
      return '';
    }

    if (item.badge === '#parkingOpened'){
      if (this.parkingSrv.parkingOpened){
        return 'Opened';
      }
      return 'Closed';
    }

    if (item.badge === '#entriesCount'){
      return this.sharedSrv.entriesCount.toString();
    }

    return item.badge;
  }


}
