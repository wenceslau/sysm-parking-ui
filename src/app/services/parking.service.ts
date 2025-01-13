import {Injectable} from '@angular/core';
import {AuthType, ContentType, HttpService, Parameter} from "./http.service";
import {Subscriber} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ParkingService {

  private parkingStatus: { isOpen: boolean, capacity: number, occupation: number } = {isOpen: false, capacity: 0, occupation: 0};

  constructor(private httpSrv: HttpService) {
    this.status();
  }

  status() {
    const parameter = new Parameter();
    parameter.path = "/status";
    this.httpSrv.get(parameter).then(r => {
      this.parkingStatus = r;
    });
  }

  open(capacity: number, subscriber?: Subscriber<any>): Promise<any> {
    this.parkingStatus.capacity = capacity;
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

  report(date?: Date, subscribe?: Subscriber<any>): Promise<any> {
    const parameter = new Parameter();
    let strDate = "";
    if (date) {
      strDate = "/"+ date.toISOString().split('T')[0];
    }
    parameter.path = "/report" + strDate;
    return this.httpSrv.get(parameter, subscribe);
  }

  setOpen() {
    this.parkingStatus.isOpen = true;
  }

  get isOpen() {
    return this.parkingStatus.isOpen;
  }

  get capacity() {
    return this.parkingStatus.capacity;
  }

  get occupation() {
    return this.parkingStatus.occupation;
  }

}
