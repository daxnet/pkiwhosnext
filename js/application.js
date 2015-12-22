var WhosNextApplication;
(function (WhosNextApplication) {
    'use strict';
    var Staff = (function () {
        function Staff(id, name, file) {
            this.id = id;
            this.name = name;
            this.file = file;
        }
        // Initialize the Staff repository.
        Staff.init = function () {
            return [new Staff(1, "Brian An", "images/Brian An.jpg"),
                new Staff(2, "Cheng-cheng", "images/Cheng-cheng.jpg"),
                new Staff(3, "Frank Zhou", "images/Frank Zhou.jpg"),
                new Staff(4, "Jamie Tao", "images/Jamie Tao.jpg"),
                new Staff(5, "Jason Yan", "images/Jason Yan.jpg"),
                new Staff(6, "Jeff Chen", "images/Jeff Chen.jpg"),
                new Staff(7, "Jenkin Zhang", "images/Jenkin Zhang.jpg"),
                new Staff(8, "Jill Ye", "images/Jill Ye.jpg"),
                new Staff(9, "Leon Qin", "images/Leon Qin.jpg"),
                new Staff(10, "Ralf Wang", "images/Ralf Wang.jpg"),
                new Staff(11, "Seven Jin", "images/Seven Jin.jpg"),
                new Staff(12, "Sunny Chen", "images/Sunny Chen.jpg"),
                new Staff(13, "Sunny Sun", "images/Sunny Sun.jpg"),
                new Staff(14, "Tim Liang", "images/Tim Liang.jpg"),
                new Staff(15, "Wilson Tian", "images/Wilson Tian.jpg"),
                new Staff(16, "Zoe Zhao", "images/Zoe Zhao.jpg")];
        };
        return Staff;
    })();
    WhosNextApplication.Staff = Staff;
})(WhosNextApplication || (WhosNextApplication = {}));
/// <reference path="../_all.ts" />
var WhosNextApplication;
(function (WhosNextApplication) {
    'use strict';
    var WhosNextController = (function () {
        function WhosNextController($scope) {
            this.$scope = $scope;
            $scope.vm = this;
            $scope.totalSeconds = 70;
            this.model = WhosNextApplication.Staff.init();
            this.reset();
            setInterval(function () { $scope.currentTime = new Date().toLocaleTimeString(); $scope.$apply(); }, 1000);
        }
        WhosNextController.prototype.initIndexMap = function () {
            this.indexMap = [];
            for (var i = 0; i < this.model.length; i++) {
                var calculatedIdx = Math.floor(Math.random() * this.model.length);
                while (this.indexMap.indexOf(calculatedIdx) >= 0) {
                    calculatedIdx = Math.floor(Math.random() * this.model.length);
                }
                this.indexMap[i] = calculatedIdx;
            }
        };
        WhosNextController.prototype.bind = function () {
            this.$scope.currentStaff = this.model[this.indexMap[this.currentIdx]];
            if (this.currentIdx === this.model.length - 1) {
                this.$scope.nextStaff = null;
            }
            else {
                this.$scope.nextStaff = this.model[this.indexMap[this.currentIdx + 1]];
            }
        };
        WhosNextController.prototype.reset = function () {
            clearTimeout(this.timerHandler);
            this.initIndexMap();
            this.$scope.remainingSeconds = this.$scope.totalSeconds;
            this.$scope.startDisabled = false;
            this.$scope.stopDisabled = true;
            this.$scope.skipDisabled = true;
            this.currentIdx = 0;
            this.bind();
        };
        WhosNextController.prototype.start = function () {
            var _this = this;
            this.$scope.startDisabled = true;
            this.$scope.stopDisabled = false;
            this.$scope.skipDisabled = false;
            this.timerHandler = setInterval(function () {
                _this.$scope.remainingSeconds--;
                if (_this.$scope.remainingSeconds === 0) {
                    _this.$scope.remainingSeconds = _this.$scope.totalSeconds;
                    _this.currentIdx++;
                    if (_this.currentIdx === _this.model.length) {
                        alert('No one else!');
                        _this.reset();
                    }
                    else {
                        _this.bind();
                    }
                }
                _this.$scope.$apply();
            }, 1000);
        };
        WhosNextController.prototype.stop = function () {
            clearTimeout(this.timerHandler);
            this.$scope.startDisabled = false;
            this.$scope.stopDisabled = true;
            this.$scope.skipDisabled = true;
        };
        WhosNextController.prototype.skip = function () {
            this.$scope.remainingSeconds = this.$scope.totalSeconds;
            this.currentIdx++;
            if (this.currentIdx === this.model.length - 1) {
                this.$scope.skipDisabled = true;
            }
            this.bind();
        };
        WhosNextController.$inject = ['$scope'];
        return WhosNextController;
    })();
    WhosNextApplication.WhosNextController = WhosNextController;
})(WhosNextApplication || (WhosNextApplication = {}));
/// <reference path="../_all.ts" />
/// <reference path="_all.ts" />
var WhosNextApplication;
(function (WhosNextApplication) {
    'use strict';
    angular.module('whosnext', [])
        .controller('whosNextController', WhosNextApplication.WhosNextController);
})(WhosNextApplication || (WhosNextApplication = {}));
/// <reference path="typings/angularjs/angular.d.ts" />
/// <reference path="models/staff.ts" />
/// <reference path="controllers/WhosNextController.ts" />
/// <reference path="interfaces/IWhosNextScope.ts" />
/// <reference path="application.ts" />
//# sourceMappingURL=application.js.map