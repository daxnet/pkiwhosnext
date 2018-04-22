import { Component, OnInit, OnDestroy } from '@angular/core';
import { StaffService } from './staff.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { Staff, StaffId, EmptyStaff } from './staff';
import { DomSanitizer } from '@angular/platform-browser';
import { environment } from '../environments/environment';
import notify from 'devextreme/ui/notify';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnDestroy {

  private subscriber: Subscription;
  private userId: string;
  private staff: Staff = EmptyStaff;
  private disableUpload = true;

  newAvatarFiles: any[] = [];
  newAvatarDataUri: string;

  constructor(private staffService: StaffService,
    private route: ActivatedRoute,
    private domSanitizer: DomSanitizer) { }

  ngOnInit() {
    this.subscriber = this.route.params.subscribe(params => {
      this.userId = params['uid'];
      this.reload();
    });
  }

  ngOnDestroy(): void {
    this.subscriber.unsubscribe();
  }

  reload(): void {
    this.disableUpload = true;
    this.newAvatarFiles = [];
    const staffId = new StaffId(this.userId);
    this.staffService.getStaffById(staffId).then(response => {
      this.staff = response;
    });
  }

  onAvatarChanged(e) {
    const fileReader = new FileReader();
    fileReader.onload = (ev) => {
      this.staff.avatar = fileReader.result;
      this.disableUpload = false;
    };

    if (e.value && e.value.length > 0) {
      const file = e.value[0];
      if (file.size > environment.maxAvatarSize * 1024) {
        notify({message: `Avatar image should be less than ${environment.maxAvatarSize} KB.`,
          maxWidth: '350px',
          position: 'top'}, 'warning', 3000);
        this.newAvatarFiles = [];
      } else {
        fileReader.readAsDataURL(file);
      }
    }
  }

  updateClick() {
    this.disableUpload = true;
    this.staffService.updateStaff(this.staff)
      .then(response => {
        notify({message: 'Profile updated successfully.',
            maxWidth: '350px',
            position: 'top'}, 'success', 3000);
          this.newAvatarFiles = [];
      })
      .catch(err => {
        notify({message: err.message,
            maxWidth: '350px',
            position: 'top'}, 'warning', 3000);
        this.disableUpload = false;
      });
  }
}
