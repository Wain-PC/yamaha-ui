/**
 * @ngdoc filter
 * @memberof yamahaUi
 * @description Creates pretty signed numbers
 *
 *
 * */
angular.module('yamahaUi')
    .filter('tunerAMFM', function($filter){
        return function(input, title) {
            return $filter('number')(input, 1) + ' ' + (title || "MHz");
        };
});

