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
    .directive('eightList', function ($mdDialog, yamahaJS, $timeout) {
        return {
            restrict: 'E',
            scope: {
                inputname: '='
            },
            controller: function ($scope) {
                var vm = this;
                vm.header = 'List';

                $scope.$watch('inputname', function (newValue) {
                    if (newValue) {
                       return vm.startup();
                    }
                });

                vm.startup = function () {
                    vm.list = [];
                    yamahaJS.list.jumpLine($scope.inputname, 1)
                        .then(vm.updateList)
                        .then(vm.getFullList);
                };

                vm.updateList = function (purgeList) {
                    return yamahaJS.list.get($scope.inputname).then(function (list) {
                        vm.max = list.numItems;
                        vm.level = list.level;
                        vm.header = list.header;
                        vm.cursorPosition = list.cursorPosition;
                        if (purgeList) {
                            vm.list = [];
                        }
                        vm.list = vm.list.concat(list.list);
                        $scope.$apply();
                    });
                };

                vm.listItemClick = function (value, type, $event) {
                    //jump to this line
                    return yamahaJS.list.jumpLine($scope.inputname, value)
                        .then(function () {
                            //determine the position of the cursor relative to the beginning of the page
                            yamahaJS.list.selectItem($scope.inputname, value%8 || 8)
                        })
                        //then update the list
                        .then(function () {
                            //that means it's a folder and we need to update the list
                            if(type) {
                               return vm.startup();
                            }
                        });
                };
                vm.goBack = function () {
                    return yamahaJS.list.back($scope.inputname)
                        //then jump to line 1 of the list
                        .then(function () {
                            return yamahaJS.list.jumpLine($scope.inputname, 1);
                        })
                        //then update the list
                        .then(function () {
                            vm.startup();
                        });
                };

                //this should have been called N times when the first page has been received
                //and the total page pool size has been calculated
                vm.nextPage = function (purgeList) {
                    return yamahaJS.list.nextPage($scope.inputname)
                        //then update the list
                        .then(function () {
                            console.log("Got page:", Math.ceil(vm.cursorPosition / 8));
                            return vm.updateList(purgeList);
                        });
                };

                vm.prevPage = function () {
                    //can't go back if already at the beginning of the list
                    if (vm.cursorPosition <= 8) {
                        return false;
                    }
                    return yamahaJS.list.prevPage($scope.inputname)
                        //then update the list
                        .then(function () {
                            vm.updateList(true);
                        });
                };

                vm.getFullList = function () {
                    var numPages = Math.ceil(vm.max / 8),
                        promise = Promise.resolve(), i;
                    for (i = 1; i < numPages; i++) {
                        promise = promise.then(vm.nextPage).then(function () {
                            //TODO: remove when the case with doubling pages has been investigated
                            return $timeout(function () {
                            }, 100)
                        });
                    }
                    return promise;
                }

            },
            controllerAs: 'eightList',
            templateUrl: '/app/components/directives/eightList/eightList.tmpl.html'
        };
    });
