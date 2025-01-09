import {Injectable} from '@angular/core';
import {JwtHelperService} from "@auth0/angular-jwt";
import {environment} from "../../environments/environment";
import {StorageService} from "../services/storage.service";
import {AuthType, HttpService, Parameter} from "../services/http.service";
import {lastValueFrom} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public loggedIn = false;

  constructor(private jwtHelper: JwtHelperService,
              private http: HttpService,
              private httpClient: HttpClient,
              private storage: StorageService) {
    this.loggedIn = this.logged();
  }

  async logIn(username: string, password: string): Promise<any> {

    const parameter = new Parameter();
    parameter.authType = AuthType.NONE
    parameter.payload = {username, password};
    parameter.path = '/auth';

    const response = await this.http.post(parameter);
    this.storage.addToken(response.token);
    this.loggedIn = this.logged();
    return response;
  }

  logOut(): void {
    this.storage.clearToken();
  }

  singleSignOn(): void {
    /*
      This method call KeyCloak using Implicit Flow. The user will be redirected to KeyCloak login page
      The implicit flow is the less secure flow, because the token is exposed to the browser
      The answer is the token itself
      On the callback, we use the token to authenticate the user
     */

    const oauthUrl = environment.oauth.url;
    const realm = environment.oauth.realm;
    const clientId = environment.oauth.clientId;
    const callback = environment.oauth.callback;
    const responseType = environment.oauth.responseType;

    // nonce = number use once, value to validate at my callback to avoid replay, the same value must be the same
    // state = value inside html to avoid CSRF, it is sent to keycloak, and it will deliver back on URL parameter from callback
    const nonce = Math.random().toString(36);
    const state = Math.random().toString(36);
    localStorage.setItem("nonce", nonce);
    localStorage.setItem("state", state);

    const urlCallback = window.location.origin + callback;
    const loginParams = new URLSearchParams({
      client_id: clientId,
      redirect_uri: urlCallback,
      response_type: responseType,
      nonce, //keycloak is already prepared to receive nonce and state, and send it back within token and on url parameter
      state
    });

    document.location.href = `${oauthUrl}/realms/${realm}/protocol/openid-connect/auth?${loginParams.toString()}`;
  }

  singleSignOut(): void {
    const oauthUrl = environment.oauth.url;
    const realm = environment.oauth.realm;
    const clientId = environment.oauth.clientId;
    const logout = environment.oauth.logout;

    let id_token = this.storage.fetchIdToken();
    if (!id_token) {
      document.location.href = "/home";
      return;
    }

    const urlLogout = window.location.origin + logout;
    const logoutParams = new URLSearchParams({
      client_id: clientId,
      id_token_hint: id_token,
      post_logout_redirect_uri: urlLogout
    });

    const url = `${oauthUrl}/realms/${realm}/protocol/openid-connect/logout?${logoutParams.toString()}`;

    this.storage.clearToken();
    document.location.href = url;
  }

  hasPermission(role: string): boolean {
    console.log('checking role: ' + role);
    let access_token = this.storage.fetchToken() as string
    let token = this.jwtHelper.decodeToken(access_token);
    let roles = token.realm_access.roles;
    return roles.includes(role);
  }

  isAccessTokenInvalid(): boolean {
    let token = this.storage.fetchToken();
    if (!token || token === 'undefined') {
      return true;
    }
    return this.jwtHelper.isTokenExpired(token);
  }

  logged() {
    return !this.isAccessTokenInvalid();
  }
}
