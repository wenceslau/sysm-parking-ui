import {Component, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import {SharedService} from "../../../services/shared.service";
import {Popover} from "primeng/popover";
import {AuthService} from "../../../security/auth.service";

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
              public authSrv: AuthService) {
  }

  loginLogout() {
    if (this.authSrv.logged()) {
      this.authSrv.logOut();
      this.router.navigate(['login']);
    }else {
      this.router.navigate(['login','parking']);
    }
  }

  toggle(event: any) {
    this.op.toggle(event);
  }

}
