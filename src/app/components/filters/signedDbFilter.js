/**
 * @ngdoc filter
 * @memberof yamahaUi
 * @description Creates pretty signed numbers
 *
 *
 * */
angular.module('yamahaUi')
    .filter('signedDb', function($filter){
        return function(input) {
            return (input>=0?'+'+$filter('number')(input, 1):$filter('number')(input, 1)) + 'dB';
        };
});

