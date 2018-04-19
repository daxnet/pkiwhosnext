import { Component, OnInit } from '@angular/core';
import { Staff, StaffId, EmptyStaffId } from './staff';
import { StaffService } from './staff.service';
import { environment } from '../environments/environment';
import { Router } from '@angular/router';
import { GlobalEventsManagerService } from 'app/global-events-manager.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {

  userId = '';
  token = '';
  userName = '';

  constructor(private staffService: StaffService,
    private router: Router,
    private eventsManager: GlobalEventsManagerService) {
      this.eventsManager.updateUserIdEmitter.subscribe(updatedUserId => {
        if (updatedUserId !== null) {
          this.userId = updatedUserId;
        }
      });

      this.eventsManager.updateTokenEmitter.subscribe(updatedToken => {
        if (updatedToken !== null) {
          this.token = updatedToken;
        }
      });

      this.eventsManager.updateUserNameEmitter.subscribe(updatedUserName => {
        if (updatedUserName !== null) {
          this.userName = updatedUserName;
        }
      });
  }

  ngOnInit(): void {
    if (this.staffService.userId) {
      this.userId = this.staffService.userId;
    }

    if (this.staffService.token) {
      this.token = this.staffService.token;
    }

    if (this.staffService.userName) {
      this.userName = this.staffService.userName;
    }
  }

  logout(): void {
    this.eventsManager.updateUserId('');
    this.eventsManager.updateToken('');
    this.eventsManager.updateUserName('');
    this.staffService.logout();
    this.router.navigate(['/']);
  }
}
