import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { DxTooltipModule, DxTemplateModule, DxFileUploaderModule, DxButtonModule, DxTextBoxModule } from 'devextreme-angular';

import { AppComponent } from './app.component';
import { CurrentStaffComponent } from './current-staff.component';
import { NextStaffComponent } from './next-staff.component';
import { NavigatorComponent } from './navigator.component';
import { ProgressComponent } from './progress.component';
import { LoginComponent } from './login.component';
import { ProfileComponent } from './profile.component';

import { Routing } from './app.routing';
import { AuthGuard } from 'app/auth.guard';
import { StaffService } from 'app/staff.service';
import { GlobalEventsManagerService } from 'app/global-events-manager.service';
import { MainComponent } from './main.component';
import { ChangePasswordComponent } from './change-password.component';

@NgModule({
  declarations: [
    AppComponent,
    CurrentStaffComponent,
    NextStaffComponent,
    NavigatorComponent,
    ProgressComponent,
    LoginComponent,
    ProfileComponent,
    MainComponent,
    ChangePasswordComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    Routing,
    DxFileUploaderModule,
    DxTooltipModule,
    DxTemplateModule,
    DxTextBoxModule,
    DxButtonModule
  ],
  providers: [
    AuthGuard,
    StaffService,
    GlobalEventsManagerService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
