import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {MenuItem, MenuItemCommandEvent, MessageService} from "primeng/api";
import {SharedService} from "../../services/shared.service";

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrl: './side-menu.component.scss'
})
export class SideMenuComponent implements OnInit{

  items: MenuItem[] | undefined;

  constructor(private messageService: MessageService,
              public shared: SharedService,
              private router: Router,
              private route: ActivatedRoute) {

    route.params.subscribe(params => console.log("side menu id parameter", params['id']));
  }

  ngOnInit() {
    this.items = [
      {
        label: 'Open Gate',
        icon: 'fa-regular fa-circle-play',
        badge: 'Closed',
        command: () => {
          this.navigate('checkin', 'Open Gate');
        }
      },
      {
        label: 'License Plate',
        icon: 'fa-solid fa-check-double',
        badge: this.shared.entriesCount.toString(),
        command: () => {
          this.navigate('checkin', 'License Plate');
        }
      },
      {
        label: 'Reports',
        icon: 'fa-solid fa-chart-bar',
        shortcut: '⌘+R',
        expanded: true,
        items: [
          {
            label: 'Checkin',
            command: () => {
              this.navigate('report', 'Checkin');
            }
          },
          {
            label: 'Checkout',
            command: () => {
              this.navigate('report', 'Checkout');
            }
          }
        ]
      },
    ];
  }

  navigate(path: string, name?: string) {
    this.shared.removeCrumb();
    this.shared.addCrumb({label: name});
    this.router.navigate(['parking/' + path]);
  }

  getBadgeValue(item: MenuItem) : string {
    if (!item.badge){
      return '';
    }

    if (item.label === 'License Plate') {
      return this.shared.entriesCount.toString();
    }
    return item.badge;
  }
}
