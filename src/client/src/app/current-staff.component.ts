import { Component, Input } from '@angular/core';
import { Staff } from './staff';

@Component ({
    selector: 'current-staff',
    templateUrl: 'current-staff.component.html',
    styleUrls: ['current-staff.component.css']
})

export class CurrentStaffComponent {
    @Input() staff: Staff;
}
