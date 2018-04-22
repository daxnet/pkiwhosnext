import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Staff, EmptyStaff, StaffId } from './staff';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { StaffService } from './staff.service';
import notify from 'devextreme/ui/notify';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit, OnDestroy {

  private subscriber: Subscription;
  private userId: string;
  private staff: Staff = EmptyStaff;
  private oldPassword: string;
  private newPassword: string;
  private confirmPassword: string;

  private oldPasswordTooltipVisible: boolean;
  private newPasswordTooltipVisible: boolean;
  private confirmPasswordTooltipVisible: boolean;
  private confirmPasswordTooltipText: string;

  constructor(private staffService: StaffService,
    private route: ActivatedRoute,
    private domSanitizer: DomSanitizer) { }

  ngOnInit() {
    this.subscriber = this.route.params.subscribe(params => {
      this.userId = params['uid'];
      this.bindStaff();
    });
  }

  ngOnDestroy(): void {
    this.subscriber.unsubscribe();
  }

  bindStaff(): void {
    const staffId = new StaffId(this.userId);
    this.staffService.getStaffById(staffId).then(response => {
      this.staff = response;
    });

    this.clearFields();
  }

  clearFields(): void {
    this.oldPassword = '';
    this.newPassword = '';
    this.confirmPassword = '';
  }

  updateClick(): void {
    if (!this.oldPassword) {
      this.oldPasswordTooltipVisible = true;
      return;
    }
    if (!this.newPassword) {
      this.newPasswordTooltipVisible = true;
      return;
    }
    if (!this.confirmPassword) {
      this.confirmPasswordTooltipText = 'Confirm Password is required.';
      this.confirmPasswordTooltipVisible = true;
      return;
    }

    if (this.confirmPassword !== this.newPassword) {
      this.confirmPasswordTooltipText = 'The Confirm Password does not match the New Password.';
      this.confirmPasswordTooltipVisible = true;
      return;
    }

    this.staffService.changePassword(this.oldPassword, this.newPassword)
      .then(response => {
        notify({message: 'Profile updated successfully.',
            maxWidth: '350px',
            position: 'top'}, 'success', 3000);
        this.clearFields();
      })
      .catch(err => {
        notify({message: err.message,
            maxWidth: '350px',
            position: 'top'}, 'warning', 3000);
      });
  }
}
