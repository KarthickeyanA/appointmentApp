import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { AppointmentModelComponent } from './appointment-model/appointment-model.component';
import { AppointmentListComponent } from './appointment-list/appointment-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { AppointmentServiceService } from './appointment-service.service';

import { MatTableModule } from '@angular/material/table';
import { FormsModule } from '@angular/forms';
import {MatRadioModule} from '@angular/material/radio';

@NgModule({
  declarations: [
    AppComponent,
    AppointmentModelComponent,
    AppointmentListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatDialogModule,
    HttpClientModule,
    MatTableModule,
    FormsModule,
    MatRadioModule
  ],
  exports: [
    MatTableModule,
    MatRadioModule
  ],
  providers: [
    AppointmentServiceService,
  ],
  entryComponents: [
    AppointmentModelComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
