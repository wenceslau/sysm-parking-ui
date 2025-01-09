import {Component, signal} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../../security/auth.service";
import {SharedService} from "../../services/shared.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  private redirectUrl: string = '/home';
  protected user: string = '';
  protected pass: string = '';

  constructor(private router: Router,
              protected shared: SharedService,
              private route: ActivatedRoute,
              private auth: AuthService) {

    route.params.subscribe(params => this.redirectUrl = params['redirect']);
    console.log("redirectUrl", this.redirectUrl);
  }

  visible: boolean = true;

  closeDialog() {
    this.router.navigate(["/home"]);
  }

  logIn() {
    this.auth.logIn(this.user, this.pass).then(r => {
      console.log("logIn", r);
      this.router.navigate([this.redirectUrl]);
    }).catch(e => {
      this.shared.error("Invalid username or password", 10);
    })
  }

}
