import {Inject, Injectable} from '@angular/core';
import {DOCUMENT} from "@angular/common";

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private readonly storage = true;
  private readonly nek = 'nek';
  private readonly nekId = 'nekid';

  constructor(@Inject(DOCUMENT) private document: Document) {

  }

  addStorage(value: any, name: string) {
    localStorage.setItem(name, value);
  }

  fetchStorage(name: string): string {
    return localStorage.getItem(name) as string;
  }

  removeStorage(name: string) {
    localStorage.removeItem(name);
  }

  addToken(token: string, idToken?: string, refreshToken?: string) {

    if (this.storage) {
      this.addStorage(token, this.nek);
      this.addStorage(idToken, this.nekId);
    } else {
      const secure = true;  // Set to true if your site is served over HTTPS
      const sameSite = 'Strict'; // Can be 'Strict', 'Lax', or 'None' based on your needs
      this.document.cookie = `${this.nek}=${token}; Path=/; SameSite=${sameSite}; ${secure ? 'Secure;' : ''}`;
      this.document.cookie = `${this.nekId}=${idToken}; Path=/; SameSite=${sameSite}; ${secure ? 'Secure;' : ''}`;
    }
  }

  fetchToken(): string {
    if (this.storage) {
      return this.fetchStorage(this.nek);
    } else {
      const matches = document.cookie.match(new RegExp(
        '(?:^|; )' + encodeURIComponent(this.nek) + '=([^;]*)'
      ));
      return matches ? decodeURIComponent(matches[1]) : "";
    }
  }

  fetchIdToken(): string {
    if (this.storage) {
      return this.fetchStorage(this.nekId);
    } else {
      const matches = document.cookie.match(new RegExp(
        '(?:^|; )' + encodeURIComponent(this.nekId) + '=([^;]*)'
      ));
      return matches ? decodeURIComponent(matches[1]) : "";
    }
  }

  clearToken() {
    document.cookie = this.nek + '=; Path=/; Max-Age=0; Secure; SameSite=Strict';
    document.cookie = this.nekId + '=; Path=/; Max-Age=0; Secure; SameSite=Strict';

    document.cookie = this.nek + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = this.nekId + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

    localStorage.removeItem(this.nek);
    localStorage.removeItem(this.nekId);
  }
}
