import {Injectable, signal} from '@angular/core';
import {MenuItem, MessageService} from "primeng/api";
import {AuthService} from "../security/auth.service";

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  entriesCount: number = 0;
  breadcrumbItems: MenuItem[] = [];

  constructor(private messageService: MessageService) {
  }

  addCrumb(item: MenuItem, removeLast: boolean = false, initializer: boolean = false) {

      if (initializer) {
        this.breadcrumbItems = [];
      }

    setTimeout(() => {
      if (removeLast) {
        this.removeCrumb();
      }
      this.breadcrumbItems.push(item);
      this.breadcrumbItems = [...this.breadcrumbItems];
    }, 100);
  }

  removeCrumb() {
    if (this.breadcrumbItems?.length > 1) {
      this.breadcrumbItems?.pop();
    }
    this.breadcrumbItems = [...this.breadcrumbItems];
  }

  // Error handler

  handlerError(err: any): string {
    let errorMsg = this.extractError(err)
    this.messageService.add({severity: 'error', summary: 'Error', detail: errorMsg});
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

  // Messages and notifications handler

  messageType: string = "";
  messageContent: string = "";
  messageVisible = signal(false);
  private showMessage(type: string, content: string, timeout: number = 3) {
    this.messageType = type;
    this.messageContent = content;
    this.messageVisible.set(true);

    setTimeout(() => {
      this.messageType = "";
      this.messageContent = "";
      this.messageVisible.set(false);
    }, (1000 * timeout));
  }

  success(message: string, timeout?: number) {
    this.messageService.add({severity: 'success', summary: 'Success', detail: message});
    this.showMessage('success', message, timeout);
  }

  information(message: string) {
    this.messageService.add({severity: 'info', summary: 'Information', detail: message});
    this.showMessage('info', message);

  }

  warning(message: string) {
    this.messageService.add({severity: 'warning', summary: 'Warning', detail: message});
    this.showMessage('warn', message);
  }

  error(message: string, timeout?: number) {
    this.messageService.add({severity: 'error', summary: 'Error', detail: message, life: 3000});
    this.showMessage('error', message, timeout);
    console.error(message);
  }

}
