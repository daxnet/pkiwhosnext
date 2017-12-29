import { Component, Input, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Staff, StaffId } from './staff';
import { StaffService } from 'app/staff.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'current-staff',
    templateUrl: 'current-staff.component.html',
    styleUrls: ['current-staff.component.css']
})

export class CurrentStaffComponent {

    @Input()
    set staffId(id: StaffId) {
        this.service.getStaffById(id)
            .then(response => {
                this.staff = response;
            });
    }

    private staff: Staff;

    constructor(private service: StaffService,
        private domSanitizer: DomSanitizer) {
    }
};
