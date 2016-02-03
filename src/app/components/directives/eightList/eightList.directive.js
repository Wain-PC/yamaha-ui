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
                        vm.updateList();
                    }
                });

                vm.updateList = function () {
                    return yamahaJS.list.get($scope.inputname).then(function (list) {
                        console.log("List:",list);
                        $scope.list = list;
                        $scope.$apply();
                    });
                };

                vm.listItemClick = function (value, $event) {
                    return yamahaJS.list.selectItem($scope.inputname, value)
                        //then update the list
                        .then(vm.updateList.bind(vm));
                };
                vm.goBack = function () {
                    return yamahaJS.list.back($scope.inputname)
                        //then update the list
                        .then(vm.updateList.bind(vm));
                };

            },
            controllerAs: 'eightList',
            templateUrl: '/app/components/directives/eightList/eightList.tmpl.html'
        };
    });
