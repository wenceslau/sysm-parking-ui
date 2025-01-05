import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {SharedService} from "../../../services/shared.service";

@Component({
  selector: 'app-top-menu',
  templateUrl: './top-menu.component.html',
  styleUrl: './top-menu.component.scss'
})
export class TopMenuComponent {

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

}
