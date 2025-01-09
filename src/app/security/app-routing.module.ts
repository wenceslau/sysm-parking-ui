import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "../pages/home/home.component";
import {AboutComponent} from "../pages/about/about.component";
import {ParkingComponent} from "../pages/parking/parking.component";
import {CheckinComponent} from "../pages/parking/checkin/checkin.component";
import {ReportComponent} from "../pages/parking/report/report.component";
import {WelcomeComponent} from "../pages/shaed/welcome/welcome.component";
import {LoginComponent} from "../pages/login/login.component";
import {AuthGuard} from "./auth.guard";
import {OpenComponent} from "../pages/parking/open/open.component";

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'parking',
    component: ParkingComponent,
    canActivate: [AuthGuard],
    data: { roles: ['USER'] },
    children: [
      {
        path: 'open',
        component: OpenComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'checkin',
        component: CheckinComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'report',
        component: ReportComponent,
        canActivate: [AuthGuard],
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
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'login/:redirect',
    component: LoginComponent
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
