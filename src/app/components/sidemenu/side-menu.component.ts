import {Component} from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-sidemenu',
  templateUrl: './side-menu.component.html',
  styleUrl: './side-menu.component.scss'
})
export class SideMenuComponent {

  constructor(route: ActivatedRoute) {

    route.params.subscribe(params => console.log("side menu id parameter", params['id']));

  }
}
