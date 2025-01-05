import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./pages/home/home.component";
import {AboutComponent} from "./pages/about/about.component";
import {ParkingComponent} from "./pages/parking/parking.component";
import {CheckinComponent} from "./pages/parking/checkin/checkin.component";
import {ReportComponent} from "./pages/parking/report/report.component";
import {WelcomeComponent} from "./components/welcome/welcome.component";

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'parking',
    component: ParkingComponent,
    children: [
      {
        path: 'checkin',
        component: CheckinComponent
      },
      {
        path: 'report',
        component: ReportComponent
      },
      {
        path: '',
        component: WelcomeComponent
      }
    ]
  },
  {
    path: 'about',
    component: AboutComponent
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: '/home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'} )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
