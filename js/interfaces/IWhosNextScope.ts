
/// <reference path="../_all.ts" />

module WhosNextApplication {
    export interface IWhosNextScope extends ng.IScope{
        currentStaff: Staff;
        nextStaff: Staff;
        remainingSeconds: number;
        totalSeconds: number;
        startDisabled: boolean;
        stopDisabled: boolean;
        skipDisabled: boolean;
        currentTime: string;
        vm: WhosNextController;
    }
}