import {Injectable} from '@angular/core';
import {lastValueFrom, Observable, Subscriber} from "rxjs";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {HandlerService} from "./handler.service";

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private apiURL = 'http://localhost:8080/api';

  constructor(private http: HttpClient,
              private handlerSrv: HandlerService) {
  }

  get(parameter: Parameter, subscriber?: Subscriber<any>): Promise<any> {
    let httpUrlPath = this.urlPath(parameter);
    let httpOptions = this.options(parameter);
    let observable = this.http.get<any>(httpUrlPath, httpOptions);
    return this.httpHandler(observable, subscriber);
  }

  post(parameter: Parameter, subscriber?: Subscriber<any>): Promise<any> {
    let httpUrlPath = this.urlPath(parameter);
    let httpOptions = this.options(parameter);
    let httpPayload = parameter.payload;
    let observable = this.http.post<any>(httpUrlPath, httpPayload, httpOptions);
    return this.httpHandler(observable, subscriber);
  }

  put(parameter: Parameter, subscriber?: Subscriber<any>): Promise<any> {
    let httpUrlPath = this.urlPath(parameter);
    let httpOptions = this.options(parameter);
    let httpPayload = parameter.payload;
    let observable = this.http.put<any>(httpUrlPath, httpPayload, httpOptions);
    return this.httpHandler(observable, subscriber);
  }

  patch(parameter: Parameter, subscriber?: Subscriber<any>): Promise<any> {
    let httpUrlPath = this.urlPath(parameter);
    let httpOptions = this.options(parameter);
    let httpPayload = parameter.payload;
    let observable = this.http.patch<any>(httpUrlPath, httpPayload, httpOptions);
    return this.httpHandler(observable, subscriber);
  }

  delete(parameter: Parameter, subscriber?: Subscriber<any>): Promise<any> {
    let httpUrlPath = this.urlPath(parameter);
    let httpOptions = this.options(parameter);
    let observable = this.http.delete<any>(httpUrlPath, httpOptions);
    return this.httpHandler(observable, subscriber);
  }

  async httpHandler(observable: Observable<any>, subscriber?: Subscriber<any>): Promise<any> {
    const source$ = observable.pipe();

    return await lastValueFrom(source$)
      .then(response => {
        subscriber?.complete();
        return response;
      })
      .catch(error => {
        subscriber?.error(error);
        this.handlerSrv.throwError(error);
        return error;
      })
  }

  private urlPath(parameter: Parameter): string {
    let fullPathUrl = this.apiURL;

    if (parameter.path != null) {
      fullPathUrl += parameter.path;
    }

    return fullPathUrl;
  }

  private headers(parameter: Parameter): HttpHeaders {
    let httpHeader = new HttpHeaders();

    if (parameter.authType != AuthType.NONE) {
      httpHeader = httpHeader.append("Authorization", parameter.authType + localStorage.getItem("ekot"));
    }

    if (parameter.contentType != ContentType.NONE) {
      httpHeader = httpHeader.append("Content-Type", parameter.contentType);
    }

    return httpHeader;
  }

  private options(parameter: Parameter): any {
    let httpHeaders = this.headers(parameter);
    let httpParams = parameter.httpParams;

    return {headers: httpHeaders, params: httpParams};
  }

}

export class Parameter {
  public contentType: ContentType = ContentType.JSON;
  public authType: AuthType = AuthType.BEARER;
  public httpParams: HttpParams = new HttpParams();
  public payload: any;
  public path: string = "";
  public blob: boolean = false;

  addParameter(key: string, value: any) {
    this.httpParams = this.httpParams.append(key, value);
  }

  clearParameters() {
    this.httpParams = new HttpParams();
  }
}

export enum ContentType {
  JSON = "application/json",
  FORM = "application/x-www-form-urlencoded",
  MULTIPART = "multipart/form-data",
  TEXT = "text/plain",
  BLOB = "application/octet-stream",
  NONE = ""
}

export enum AuthType {
  BEARER = "Bearer ",
  BASIC = "Basic ",
  NONE = ""
}
