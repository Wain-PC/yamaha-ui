/**
 * @ngdoc directive
 * @name yamahaUi:tuner
 *
 * @description
 *
 *
 * @restrict E
 * */
angular.module('yamahaUi')
    .directive('tuner', function () {
        return {
            restrict: 'E',
            scope: {
                frequency: '=',
                type: '='
            },
            controller: function ($scope) {
                $scope.options = {
                    value: $scope.frequency,
                    type: $scope.type,
                    infoRows: [
                        {name: 'Program type', valueName: 'programType'},
                        {name: 'Program service', valueName: 'programService'},
                        {name: 'Radio Text A', valueName: 'radioTextA'},
                        {name: 'Radio Text B', valueName: 'radioTextB'},
                        {name: 'Clock Time', valueName: 'clockTime'}
                    ],
                    info: {
                        programType: 'One',
                        programService: 'Two',
                        radioTextA: 'Samle One',
                        radioTextB: 'Sample Two',
                        clockTime: 'Yoba'
                    }
                };

                $scope.$watch('options.type', function (newValue, oldValue) {
                    if(newValue === 'FM' && oldValue === 'AM') {
                        $scope.options.value /= 10;
                    }
                    else if(newValue === 'AM' && oldValue === 'FM') {
                        $scope.options.value *= 10;
                    }
                })

            },
            controllerAs: 'tuner',
            templateUrl: '/app/components/directives/tuner/tuner.tmpl.html'
        };
    });
