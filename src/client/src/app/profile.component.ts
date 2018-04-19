import { Component, OnInit, OnDestroy } from '@angular/core';
import { StaffService } from './staff.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { Staff, StaffId, EmptyStaff } from './staff';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnDestroy {

  private subscriber: Subscription;
  private userId: string;
  private staff: Staff = EmptyStaff;

  constructor(private staffService: StaffService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.subscriber = this.route.params.subscribe(params => {
      this.userId = params['uid'];
      const staffId = new StaffId(this.userId);
      this.staffService.getStaffById(staffId).then(response => {
        this.staff = response;
      });
    });
  }

  ngOnDestroy(): void {
    this.subscriber.unsubscribe();
  }

}
