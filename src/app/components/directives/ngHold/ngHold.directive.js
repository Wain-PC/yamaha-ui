/**
 * @ngdoc directive
 * @name yamahaUi:ngHold
 *
 * @description
 *
 *
 * @restrict A
 * */
angular.module('yamahaUi')
    .directive('ngHold', function ($parse, $interval, $timeout) {
        return {
            restrict: 'A',
            link: function ($scope, $elm, $attrs) {
                var fn = $parse($attrs.ngHold),
                    isHolding, intervalId, timeoutId,
                    interval = $attrs.ngHoldInterval || 100,
                    initialTimeout = 300;
                $elm.on('mousedown', function ($event) {
                    //perform first click, then timeout
                    fn($scope, {$event: $event});
                    isHolding = true;
                    timeoutId = $timeout(function () {
                        intervalId = $interval(function () {
                            if (isHolding) {
                                fn($scope, {$event: $event});
                            }
                        }, interval);
                    }, initialTimeout);

                });

                $elm.on('mouseup', function () {
                    isHolding = false;



                    if (timeoutId) {
                        $timeout.cancel(timeoutId);
                        timeoutId = null;
                    }

                    if (intervalId) {
                        $interval.cancel(intervalId);
                        intervalId = null;
                    }
                });
            }//dsf
        };
    });
