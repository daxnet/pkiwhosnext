import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { CurrentStaffComponent } from './current-staff.component';
import { NextStaffComponent } from './next-staff.component';
import { NavigatorComponent } from './navigator.component';
import { ProgressComponent } from './progress.component';

@NgModule({
  declarations: [
    AppComponent,
    CurrentStaffComponent,
    NextStaffComponent,
    NavigatorComponent,
    ProgressComponent
  ],
  imports: [
    NgbModule.forRoot(),
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
