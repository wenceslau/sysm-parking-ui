import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

import {AppRoutingModule} from './security/app-routing.module';
import {AppComponent} from './app.component';
import {TopMenuComponent} from './pages/shaed/top-menu/top-menu.component';
import {HomeComponent} from './pages/home/home.component';

import {DatePicker} from 'primeng/datepicker';
import {Breadcrumb} from 'primeng/breadcrumb';
import {PanelMenu} from 'primeng/panelmenu';
import {Message} from 'primeng/message';
import {InputMask} from 'primeng/inputmask';
import { ConfirmPopupModule } from 'primeng/confirmpopup';


import {SideMenuComponent} from './pages/shaed/side-menu/side-menu.component';
import {ParkingComponent} from './pages/parking/parking.component';
import {AboutComponent} from './pages/about/about.component';
import {CheckinComponent} from './pages/parking/checkin/checkin.component';
import {Badge} from "primeng/badge";
import {Ripple} from "primeng/ripple";
import {ConfirmationService, MessageService} from "primeng/api";
import {Toast} from "primeng/toast";
import {providePrimeNG} from "primeng/config";
import {provideAnimationsAsync} from "@angular/platform-browser/animations/async";
import {ReportComponent} from './pages/parking/report/report.component';
import {WelcomeComponent} from './pages/shaed/welcome/welcome.component';
import {NgOptimizedImage} from "@angular/common";
import {InputText} from "primeng/inputtext";
import {VehicleTypeComponent} from './pages/parking/checkin/vehicle-type/vehicle-type.component';
import {Button, ButtonDirective, ButtonLabel} from "primeng/button";
import {Dialog} from "primeng/dialog";
import {Select} from "primeng/select";
import {EntryRecordsComponent} from './pages/parking/checkin/entry-records/entry-records.component';
import {TableModule} from "primeng/table";
import { LoginComponent } from './pages/login/login.component';
import {MyPreset} from "../../public/mytheme";
import { OpenComponent } from './pages/parking/open/open.component';
import {KeyFilter} from "primeng/keyfilter";
import {Tooltip} from "primeng/tooltip";
import {Popover} from "primeng/popover";


@NgModule({
  declarations: [
    AppComponent,
    TopMenuComponent,
    HomeComponent,
    SideMenuComponent,
    ParkingComponent,
    AboutComponent,
    CheckinComponent,
    ReportComponent,
    WelcomeComponent,
    VehicleTypeComponent,
    EntryRecordsComponent,
    LoginComponent,
    OpenComponent,
  ],
    imports: [
        BrowserAnimationsModule,
        BrowserModule,
        FormsModule,
        AppRoutingModule,
        DatePicker,
        Breadcrumb,
        PanelMenu,
        Badge,
        Ripple,
        Message,
        Toast,
        NgOptimizedImage,
        InputText,
        InputMask,
        Button,
        Dialog,
        Select,
        TableModule,
        ButtonDirective,
        ButtonLabel,
        KeyFilter,
        ReactiveFormsModule,
        ConfirmPopupModule,
        Tooltip,
        Popover
    ],
  exports: [],
  providers: [
    MessageService,
    ConfirmationService,
    provideAnimationsAsync(),
    providePrimeNG({
      theme: {
        preset: MyPreset,
        options: {
          prefix: 'p',
          darkModeSelector: 'system',
          cssLayer: false,
        }
      }
    })
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
