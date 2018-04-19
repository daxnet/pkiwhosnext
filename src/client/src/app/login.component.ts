import { Component, OnInit, ViewContainerRef  } from '@angular/core';
import { Router } from '@angular/router';
import { StaffService } from './staff.service';
import { GlobalEventsManagerService } from './global-events-manager.service';

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
    let validate = true;
    if (!this.userName) {
      this.userNameTooltipVisible = true;
      validate = false;
    }

    if (!this.password) {
      this.passwordTooltipVisible = true;
      validate = false;
    }

    if (validate) {
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
          console.log(err.message);
        });
    }
  }

  clearUserNameTooltip() {
    this.userNameTooltipVisible = false;
  }

  clearPasswordTooltip() {
    this.passwordTooltipVisible = false;
  }
}
