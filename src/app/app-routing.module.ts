import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ContainerComponent} from "./pages/container/container.component";
import {SideMenuComponent} from "./components/sidemenu/side-menu.component";

const routes: Routes = [
  {
    path: 'home',
    component: ContainerComponent
  },
  {
    path: 'about',
    component: ContainerComponent
  },
  {
    path: 'courses',
    component: ContainerComponent
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
  },
  {
    path: 'courses',
    component: ContainerComponent,
    children: [
      {
        path: '',
        component: ContainerComponent
      },
      {
        path: '',
        outlet: 'sidemenu',
        component: SideMenuComponent
      }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
