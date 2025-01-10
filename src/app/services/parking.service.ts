import {Injectable} from '@angular/core';
import {AuthType, ContentType, HttpService, Parameter} from "./http.service";
import {Subscriber} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ParkingService {

  parkingCapacity: number | undefined;
  parkingOpened: boolean = false;

  constructor(private httpSrv: HttpService) {
  }

   open(capacity: number, subscriber?: Subscriber<any>): Promise<any> {
    this.parkingCapacity = capacity;
    const parameter = new Parameter();
    parameter.path = "/open/" + capacity;
    parameter.contentType = ContentType.NONE;
    return this.httpSrv.post(parameter, subscriber);
  }

  register(body: any, subscriber?: Subscriber<any>): Promise<any> {
    const parameter = new Parameter();
    parameter.path = "/register"
    parameter.payload = body;
    return this.httpSrv.post(parameter, subscriber);
  }

  report(subscribe?: Subscriber<any>): Promise<any> {
    const parameter = new Parameter();
    parameter.path = "/report"
    return this.httpSrv.get(parameter, subscribe);
  }

}
