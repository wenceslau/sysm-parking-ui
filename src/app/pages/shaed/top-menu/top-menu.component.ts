import {Component, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import {SharedService} from "../../../services/shared.service";
import {Popover} from "primeng/popover";

@Component({
  selector: 'app-top-menu',
  templateUrl: './top-menu.component.html',
  styleUrl: './top-menu.component.scss'
})
export class TopMenuComponent {

  @ViewChild('op') op!: Popover;

  languages = ['EN', 'FR', 'PT', 'ES'];
  selectedLanguage = 'EN';

  constructor(private router: Router,
              public shared: SharedService) {
  }

  loginLogout() {
    if (this.shared.loggedIn) {
      this.shared.loggedIn = false;
      this.router.navigate(['home']);
    }else {
      this.router.navigate(['login','parking']);
    }
  }

  toggle(event: any) {
    this.op.toggle(event);
  }

}
