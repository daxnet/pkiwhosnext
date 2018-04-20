import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { StaffService } from './staff.service';
import { GlobalEventsManagerService } from './global-events-manager.service';
import notify from 'devextreme/ui/notify';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userName: '';
  password: '';
  userNameTooltipVisible = false;
  passwordTooltipVisible = false;

  constructor(private router: Router,
    private staffService: StaffService,
    private gem: GlobalEventsManagerService) { }

  ngOnInit() {
  }

  login() {
    if (!this.userName) {
      this.userNameTooltipVisible = true;
      return;
    }

    if (!this.password) {
      this.passwordTooltipVisible = true;
      return;
    }

    this.staffService.login(this.userName, this.password)
      .then(response => {
        if (response) {
          this.gem.updateUserId(response.id);
          this.gem.updateUserName(response.name);
          this.gem.updateToken(response.token);
          this.router.navigate(['profile', response.id]);
        }
      })
      .catch(err => {
        notify({message: err.message, maxWidth: '300px', position: 'top'}, 'error', 2500);
      });
  }

  clearUserNameTooltip() {
    this.userNameTooltipVisible = false;
  }

  clearPasswordTooltip() {
    this.passwordTooltipVisible = false;
  }
}
