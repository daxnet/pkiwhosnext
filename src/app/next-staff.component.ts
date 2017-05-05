import { Component, Input } from '@angular/core';
import { Staff } from './staff';

@Component({
    selector: 'next-staff',
    templateUrl: 'next-staff.component.html'
})

export class NextStaffComponent {
    @Input() private staff: Staff;
}