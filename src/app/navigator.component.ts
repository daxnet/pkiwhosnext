import { Component, Input, EventEmitter, Output } from '@angular/core';

@Component ({
    selector: 'navigator',
    templateUrl: 'navigator.component.html'
})

export class NavigatorComponent {
    @Input() currentIdx: number;
    @Input() total: number;
    @Input() started: boolean;
    @Output() onSelectIndexChanged = new EventEmitter<number>();
    @Output() onAppStatusChanged = new EventEmitter<boolean>();
    @Output() onResetRequested = new EventEmitter();

    onPrevious(): void {
        if (this.currentIdx > 0) {
            this.currentIdx--;
        }
        this.onSelectIndexChanged.emit(this.currentIdx);
        console.log(`Current Index: ${this.currentIdx}`);
    }

    onNext(): void {
        if (this.currentIdx < this.total - 1) {
            this.currentIdx++;
        }
        this.onSelectIndexChanged.emit(this.currentIdx);
        console.log(`Current Index: ${this.currentIdx}`);
    }

    onToggleAppStatus(): void {
        this.started = !this.started;
        this.onAppStatusChanged.emit(this.started);
    }

    onReset(): void {
        this.onResetRequested.emit();
    }
}
