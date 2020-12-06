import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { AppointmentModelComponent } from '../appointment-model/appointment-model.component';
import { AppointmentServiceService } from '../appointment-service.service';

@Component({
  selector: 'app-appointment-list',
  templateUrl: './appointment-list.component.html',
  styleUrls: ['./appointment-list.component.css']
})
export class AppointmentListComponent implements OnInit {
  today = new Date().getFullYear() + '-' +
    (new Date().getMonth() < 10 ? '0' + (new Date().getMonth() + 1) : (new Date().getMonth() + 1)) + '-' +
    (new Date().getDate() < 10 ? '0' + new Date().getDate() : new Date().getDate());
  appList = [];

  constructor(public dialog: MatDialog, private appService: AppointmentServiceService) { }

  ngOnInit() {
    this.getData(this.today); // to get data on current time
  }

  onClickAppointment() { // to open popup to fix the appointment
    const dialogRef = this.dialog.open(AppointmentModelComponent, {
      width: '80%',
      data: { formData: {selectedDate: this.today, data: this.appList} },
      panelClass: []
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getData(this.today);
    });
  }

  onDateChange(event) {
    if (event.target.value) {
      this.today = event.target.value;
      this.getData(event.target.value);
    }
  }

  getData(date): any { // service call to get current
    this.appService.getDataByDate(date).subscribe((res) => {
      if (res) {
        this.appList = res.data;
      }
    }, error => {
      console.log(error);
      this.appList = [];
    });
  }
}
