import { Component, Input } from '@angular/core';
import { environment } from '../environments/environment';

@Component({
    selector: 'progress-indicator',
    templateUrl: 'progress.component.html',
    styleUrls: ['progress.component.css']
})

export class ProgressComponent {
    @Input() currentIndex: number;
    @Input() remainingSeconds: number;
    @Input() totalCount: number;
    
    totalSeconds: number;

    constructor() {
        this.totalSeconds = environment.timing;
    }
}