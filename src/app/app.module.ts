import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from "@angular/forms";

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {TopMenuComponent} from './components/top-menu/top-menu.component';
import {HomeComponent} from './pages/home/home.component';

import {DatePicker} from 'primeng/datepicker';
import {Breadcrumb} from 'primeng/breadcrumb';
import {PanelMenu} from 'primeng/panelmenu';
import { Message } from 'primeng/message';
import { InputMask } from 'primeng/inputmask';


import {SideMenuComponent} from './components/side-menu/side-menu.component';
import {ParkingComponent} from './pages/parking/parking.component';
import {AboutComponent} from './pages/about/about.component';
import {TestTestComponent} from './pages/test-test/test-test.component';
import {CheckinComponent} from './pages/parking/checkin/checkin.component';
import {Badge} from "primeng/badge";
import {Ripple} from "primeng/ripple";
import {MessageService} from "primeng/api";
import {Toast} from "primeng/toast";
import {providePrimeNG} from "primeng/config";
import {provideAnimationsAsync} from "@angular/platform-browser/animations/async";
import Aura from "@primeng/themes/aura";
import {definePreset} from "@primeng/themes";
import { ReportComponent } from './pages/parking/report/report.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import {NgOptimizedImage} from "@angular/common";
import {InputText} from "primeng/inputtext";
import { VehicleTypeComponent } from './pages/parking/checkin/vehicle-type/vehicle-type.component';
import {Button} from "primeng/button";
import {Dialog} from "primeng/dialog";
import {Select} from "primeng/select";
import { EntryRecordsComponent } from './pages/parking/checkin/entry-records/entry-records.component';
import {TableModule} from "primeng/table";

const Sysm = definePreset(Aura, {
  primitive: {
    black: {
      500: 'black',
    },
  },
  semantic: {
    primary: {
      500: '{black.500}',
    },
  },
});

@NgModule({
  declarations: [
    AppComponent,
    TopMenuComponent,
    HomeComponent,
    SideMenuComponent,
    ParkingComponent,
    AboutComponent,
    TestTestComponent,
    CheckinComponent,
    ReportComponent,
    WelcomeComponent,
    VehicleTypeComponent,
    EntryRecordsComponent,
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
    TableModule
  ],
  exports: [],
  providers: [
    MessageService,
    provideAnimationsAsync(),
    providePrimeNG({
      theme: {
        preset: Sysm,
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
