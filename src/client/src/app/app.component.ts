import { Component, OnInit } from '@angular/core';
import { Staff, StaffId, EmptyStaffId } from './staff';
import { StaffService } from './staff.service';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [StaffService]
})

export class AppComponent implements OnInit {
  private staffIdList: StaffId[] = new Array();
  private selectedStaffId: StaffId;
  private nextStaffId: StaffId;
  private curIdx: number;
  private remainingSeconds: number;
  private started: boolean;
  private timerHandler: any;

  constructor(private staffService: StaffService) {
  }

  ngOnInit(): void {
    this.getStaffs();
  }

  getStaffs(): void {
    this.staffService
      .getRandomizedIdList()
      .then(response => {
        this.staffIdList = response;
        this.curIdx = 0;
        this.started = false;
        this.bindCurrent(this.curIdx);
        this.remainingSeconds = environment.timing;
        clearTimeout(this.timerHandler);
      });
  }

  onSelectIndexChanged(idx: number): void {
    console.log('onSelectIndexChanged');
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
          if (this.curIdx === this.staffIdList.length) {
            alert('No one else!');
            this.getStaffs();
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
    this.getStaffs();
  }

  private bindCurrent(idx: number): void {
    this.selectedStaffId = this.staffIdList[idx];
    this.nextStaffId = idx === this.staffIdList.length - 1 ?
      EmptyStaffId : this.staffIdList[idx + 1];

    console.log(this.selectedStaffId);
  }
}
