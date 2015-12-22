/// <reference path="../_all.ts" />

module WhosNextApplication {
    'use strict';

    export class WhosNextController {

        private model: Array<Staff>;
        private indexMap: number[];
        private currentIdx: number;
        private timerHandler: number;

        public static $inject = ['$scope'];

        constructor(private $scope: IWhosNextScope) {
            $scope.vm = this;
            $scope.totalSeconds = 5;
            this.model = Staff.init();
            this.reset();
            setInterval(() => { $scope.currentTime = new Date().toLocaleTimeString(); $scope.$apply(); }, 1000);
        }

        private initIndexMap() {
            this.indexMap = [];
            for (var i = 0; i < this.model.length; i++) {
                var calculatedIdx = Math.floor(Math.random() * this.model.length);
                while (this.indexMap.indexOf(calculatedIdx) >= 0) {
                    calculatedIdx = Math.floor(Math.random() * this.model.length);
                }
                this.indexMap[i] = calculatedIdx;
            }
        }

        private bind() {
            this.$scope.currentStaff = this.model[this.indexMap[this.currentIdx]];
            if (this.currentIdx === this.model.length - 1) {
                this.$scope.nextStaff = null;
            }
            else {
                this.$scope.nextStaff = this.model[this.indexMap[this.currentIdx + 1]];
            }
        }

        reset() {
            clearTimeout(this.timerHandler);
            this.initIndexMap();
            this.$scope.remainingSeconds = this.$scope.totalSeconds;
            this.$scope.startDisabled = false;
            this.$scope.stopDisabled = true;
            this.$scope.skipDisabled = true;
            this.currentIdx = 0;
            this.bind();
        }

        start() {
            this.$scope.startDisabled = true;
            this.$scope.stopDisabled = false;
            this.$scope.skipDisabled = false;
            this.timerHandler = setInterval(() => {
                this.$scope.remainingSeconds--;
                if (this.$scope.remainingSeconds === 0) {
                    this.$scope.remainingSeconds = this.$scope.totalSeconds;
                    this.currentIdx++;
                    if (this.currentIdx === this.model.length) {
                        alert('No one else!');
                        this.reset();
                    }
                    else {
                        this.bind();
                    }
                }
                this.$scope.$apply();
            }, 1000);
        }

        stop() {
            clearTimeout(this.timerHandler);
            this.$scope.startDisabled = false;
            this.$scope.stopDisabled = true;
            this.$scope.skipDisabled = true;
        }

        skip() {
            this.$scope.remainingSeconds = this.$scope.totalSeconds;
            this.currentIdx++;
            if (this.currentIdx === this.model.length - 1) {
                this.$scope.skipDisabled = true;
            }
            this.bind();
        }
    }
}