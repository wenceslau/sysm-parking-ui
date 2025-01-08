import { Injectable } from '@angular/core';
import {MessageService} from "primeng/api";

@Injectable({
  providedIn: 'root'
})
export class HandlerService {

  constructor(private messageService: MessageService) {
  }

  success(message: string) {
    this.messageService.add({severity: 'success', summary: 'Success', detail: message});
  }

  information(message: string) {
    this.messageService.add({severity: 'info', summary: 'Information', detail: message});
  }

  warning(message: string) {
    this.messageService.add({severity: 'warning', summary: 'Warning', detail: message});
  }

  error(message: string) {
    this.messageService.add({severity: 'error', summary: 'Error', detail: message});
    console.error(message);
  }

  throwError(err: any): string {
    let errorMsg = this.extractError(err)
    this.error(errorMsg);
    return err;
  }

  private extractError(err: any): string {
    console.log('Error...' + JSON.stringify(err))
    let errorMessage;

    errorMessage = err?.error?.message;
    if (errorMessage)
      return errorMessage;

    errorMessage = err?.message
    if (errorMessage)
      return errorMessage;

    return JSON.stringify(err);
  }
}
