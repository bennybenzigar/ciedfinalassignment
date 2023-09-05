import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataComponent } from './data/data.component';
import { DataService } from '../services/data.service';
import { authGuardService } from '../services/auth.guard';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    DashboardComponent,
    SidenavComponent,
    DataComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ],
  exports:[SidenavComponent,DashboardComponent],
providers:[DataService,authGuardService]
})
export class DashboardModule { }
