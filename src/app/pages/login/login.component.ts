import { Component } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../../security/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  private redirectUrl: string = '/home';
  private user: string = '';
  private pass: string = '';

  constructor(private router: Router,
              private route: ActivatedRoute,
              private auth: AuthService) {

    route.params.subscribe(params => this.redirectUrl = params['redirect']);
    console.log("redirectUrl", this.redirectUrl);
  }

  visible: boolean = true;

  closeDialog() {
    this.visible = false;
  }

  logIn() {
    this.auth.logIn(this.user, this.pass);
    this.router.navigate([this.redirectUrl]);
  }

}
