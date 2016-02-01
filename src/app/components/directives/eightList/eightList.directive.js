/**
 * @ngdoc directive
 * @name yamahaUi:eightList
 *
 * @description
 *
 *
 * @restrict E
 * */
angular.module('yamahaUi')
    .directive('eightList', function ($mdDialog, yamahaJS) {
        return {
            restrict: 'E',
            scope: {
                inputname: '='
            },
            controller: function ($scope) {
                var vm = this;

                $scope.$watch('inputname', function (newValue) {
                    console.log(newValue);
                    if(newValue) {
                        yamahaJS.list.get(newValue).then(function (list) {
                            console.log("List:",list);
                            $scope.list = list;
                        })
                    }
                });

                vm.listItemClick = function (value, $event) {
                    $mdDialog.show(
                        $mdDialog.alert()
                            .parent(angular.element(document.body))
                            .clickOutsideToClose(true)
                            .title('This is an alert title')
                            .textContent('You clicked on ' + value)
                            .ariaLabel('Alert Dialog Demo')
                            .ok('Fine!')
                            .targetEvent($event)
                    );
                };

            },
            controllerAs: 'eightList',
            templateUrl: '/app/components/directives/eightList/eightList.tmpl.html'
        };
    });
