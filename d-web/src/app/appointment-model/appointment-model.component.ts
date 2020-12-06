import { Component, Inject, OnChanges, OnInit, ɵbypassSanitizationTrustResourceUrl } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AppointmentServiceService } from '../appointment-service.service';

@Component({
  selector: 'app-appointment-model',
  templateUrl: './appointment-model.component.html',
  styleUrls: ['./appointment-model.component.css']
})
export class AppointmentModelComponent implements OnInit {
  pageData;
  selectedDate;
  name;
  gender: string[] = ['male', 'female'];
  age;
  phoneNumber;
  genderValue;
  selectedSlot;
  availableSlots = [
    { slotName: 'firstSlot', slotTime: '09:00-09:30' }, { slotName: 'secondSlot', slotTime: '09:30-10:00' },
    { slotName: 'thirdSlot', slotTime: '10:00-10:30' }, { slotName: 'fourthSlot', slotTime: '10:30-11:00' },
    { slotName: 'fifthSlot', slotTime: '11:00-11:30' }, { slotName: 'sixthSlot', slotTime: '11:30-12:00' },
    { slotName: 'seventhSlot', slotTime: '05:00-05:30' }, { slotName: 'eigthSlot', slotTime: '05:30-06:00' },
    { slotName: 'ninthSlot', slotTime: '06:00-06:30' }, { slotName: 'tenthSlot', slotTime: '06:30-07:00' },
    { slotName: 'eleventhSlot', slotTime: '07:00-07:30' }, { slotName: 'twelthSlot', slotTime: '07:30-08:00' }
  ];
  fromTime;
  toTime;
  constructor(
    @Inject(MAT_DIALOG_DATA) public inputData: any,
    public dialogRef: MatDialogRef<AppointmentModelComponent>,
    private appointmentService: AppointmentServiceService) {
    // to get data from mat dialog popup
    this.pageData = inputData.formData;
    if (this.pageData) {
      this.selectedDate = this.inputData.formData.selectedDate;
    }
  }

  ngOnInit() {
  }

  addSlot() {
    if (this.selectedSlot) {
      if (this.name && this.age && this.phoneNumber && this.genderValue && this.selectedSlot) {
        // service Call to add new appoinment timings
        this.appointmentService.addSlot({
          name: this.name, age: this.age, phoneNumber: this.phoneNumber, gender: this.genderValue,
          fromTime: this.fromTime, toTime: this.toTime, date: this.selectedDate, slot: this.selectedSlot
        }).subscribe((res) => {
          if (res) {
            console.log(res);
            this.dialogRef.close();
            alert('appointment fixed');
          }
        });

      } else if (!this.name || !this.age || !this.phoneNumber || !this.genderValue) {
        alert('Please fill the personal details');
      } else {
        alert('Please fill the personal details');
      }
    } else {
      alert('please select any other slot timings');
    }
  }

  checkSlotIsAvailable(selectedSlot) { // to check the existence of slot timing and avoiding overlapping
    const data = this.pageData.data;
    if (data && data.length > 0) {
      const value = data.filter((res) => {
        if (res.slot === selectedSlot && res.date === this.selectedDate) {
          alert('Slot already taken. Please go for other timings');
          return true;
        } else {
          return false;
        }
      });
      return value;
    } else {
      return [];
    }
  }

  clickSlot(event) {
    if (event) {
      const slotAvailable = this.checkSlotIsAvailable(event.target.value);
      if (slotAvailable && slotAvailable.length === 0) {
        this.availableSlots.filter((slot) => {
          if (slot.slotName === event.target.value) {
            this.selectedSlot = event.target.value;
            const time = this.getSlotTiming(slot.slotTime);
            this.fromTime = time.fromTime;
            this.toTime = time.toTime;
          }
        });
      }
    }
  }

  getSlotTiming(time) {
    if (time) {
      const frmTime =
        new Date(new Date(new Date().setHours(time.split('-')[0].split(':')[0])).setMinutes(time.split('-')[0].split(':')[1]));
      const tTime = new Date(new Date(new Date().setHours(time.split('-')[1].split(':')[0])).setMinutes(time.split('-')[1].split(':')[1]));
      return { fromTime: frmTime.getTime(), toTime: tTime.getTime() };
    }
  }

  onDateChange(event) {
    if (event.target.value) {
      // this.getData(event.target.value);
      this.selectedDate = event.target.value;
    }
  }
}
