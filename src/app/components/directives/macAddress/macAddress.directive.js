/**
 * @ngdoc directive
 * @name yamahaUi:macAddress
 *
 * @description
 *
 *
 * @restrict A
 * */
angular.module('yamahaUi')
    .directive('macAddress', function () {
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function(scope, element, attrs, modelCtrl) {
                var formatter = function(inputValue) {
                    //Add a colon after each 2 input characters, do NOT let using any non-number
                    //total input must be 6*2 = 12 numbers exactly
                    if(!inputValue) {
                        inputValue = '000000000000';
                    }
                    var transformedInput = inputValue.toUpperCase().replace(/[^A-F0-9]/g, '').substr(0,12),
                        i, length, array = [],
                        n = 2;
                    length = transformedInput.length;
                    for(i = 0; i < length; i += n) {
                        array.push(transformedInput.substr(i, n));
                    }
                    transformedInput = array.join(':');

                    if (transformedInput!=inputValue) {
                        modelCtrl.$setViewValue(transformedInput);
                        modelCtrl.$render();
                    }

                    return transformedInput;
                };

                modelCtrl.$parsers.push(formatter);
                modelCtrl.$formatters.push(formatter);
            }
        };
    });
