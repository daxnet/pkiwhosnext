import { Component, OnInit } from '@angular/core';
import { Staff } from './staff';
import { StaffService, EmptyStaff } from './staff.service';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [StaffService]
})

export class AppComponent implements OnInit {
  private allStaffs: Staff[] = new Array();
  private selectedStaff: Staff;
  private nextStaff: Staff;
  private curIdx: number;
  private remainingSeconds: number;
  private started: boolean;
  private timerHandler: any;

  constructor(private staffService: StaffService) {
  }

  ngOnInit(): void {
    this.initialize();
  }

  initialize(): void {
    this.getStaffs();
    this.curIdx = 0;
    this.started = false;
    this.bindCurrent(this.curIdx);
    this.remainingSeconds = environment.timing;
    clearTimeout(this.timerHandler);
  }

  getStaffs(): void {
    var staffs = this.staffService.getStaffs();
    console.log(staffs.length);
    var idxArray = [];
    for (var i = 0; i < staffs.length; i++) {
      var calculatedIdx = Math.floor(Math.random() * staffs.length);
      while (idxArray.indexOf(calculatedIdx) >= 0) {
        calculatedIdx = Math.floor(Math.random() * staffs.length);
      }
      idxArray[i] = calculatedIdx;
    }
    for (var i = 0; i < idxArray.length; i++) {
      this.allStaffs[i] = staffs[idxArray[i]];
    }
  }

  onSelectIndexChanged(idx: number): void {
    console.log("onSelectIndexChanged");
    this.curIdx = idx;
    this.remainingSeconds = environment.timing;
    this.bindCurrent(idx);
  }

  onAppStatusChanged(status: boolean): void {
    this.started = status;
    if (this.started) {
      this.timerHandler = setInterval(() => {
        this.remainingSeconds--;
        if (this.remainingSeconds === 0) {
          this.remainingSeconds = environment.timing;
          this.curIdx++;
          if (this.curIdx === this.allStaffs.length) {
            alert('No one else!');
            this.initialize();
          } else {
            this.bindCurrent(this.curIdx);
          }
        }
      }, 1000);
    } else {
      clearTimeout(this.timerHandler);
    }
  }

  onResetRequested(): void {
    this.initialize();
  }

  private bindCurrent(idx: number): void {
    this.selectedStaff = this.allStaffs[idx];
    this.nextStaff = idx === this.allStaffs.length - 1 ?
      EmptyStaff : this.allStaffs[idx + 1];
  }
}
