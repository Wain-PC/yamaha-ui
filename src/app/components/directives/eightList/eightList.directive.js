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
    .directive('eightList', function ($mdDialog) {
        return {
            restrict: 'E',
            scope: {
                options: '='
            },
            controller: function ($scope) {
                var vm = this;
                $scope.items = {};
                $scope.items.list = [
                    {name: 'One', value: '1'},
                    {name: 'Two', value: '2'},
                    {name: 'Three', value: '3'},
                    {name: 'Four', value: '4'},
                    {name: 'Five', value: '5'},
                    {name: 'Six', value: '6'},
                    {name: 'Seven', value: '7'},
                    {name: 'Eight', value: '8'}
                ];

                $scope.items.listHeader = 'Yoba List';

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
