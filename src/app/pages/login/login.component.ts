import { Component } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {SharedService} from "../../services/shared.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  private redirectUrl: string = '/home';

  constructor(private router: Router,
              private route: ActivatedRoute,
              private shared: SharedService) {

    route.params.subscribe(params => this.redirectUrl = params['redirect']);
    console.log("redirectUrl", this.redirectUrl);
  }

  visible: boolean = true;

  closeDialog() {
    this.visible = false;
    this.shared.loggedIn = false;
    this.router.navigate(['home']);
  }

  logIn() {
    this.shared.loggedIn = true;
    this.router.navigate([this.redirectUrl]);
  }

}
