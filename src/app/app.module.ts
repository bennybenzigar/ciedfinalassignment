import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
// import { DashboardComponent } from './dashboard/dashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataService } from './services/data.service';
import {HttpClientModule} from '@angular/common/http'
import { authGuardService } from './services/auth.guard';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
// import { SidenavComponent } from './sidenav/sidenav.component';
// import { MainComponent } from './main/main.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    // DashboardComponent,
    PageNotFoundComponent,
    // SidenavComponent,
    // MainComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
   

  ],
  providers: [DataService, authGuardService],
  bootstrap: [AppComponent],
  exports:[PageNotFoundComponent,LoginComponent]
})
export class AppModule { }
