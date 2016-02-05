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
                        var i, length;
                        vm.max = list.numItems;
                        vm.level = list.level;
                        vm.header = list.header;
                        vm.cursorPosition = list.cursorPosition;
                        //if the list must be cleared, fill the first items with the actual data,
                        //and each of the remains with 'Loading...'
                        if (purgeList) {
                            vm.list = new Array(vm.max);
                            length = vm.list.length;
                            for(i=0;i<length;i++) {
                                if(list.list[i]) {
                                    console.log(i, list.list[i].name);
                                    vm.list[i] = list.list[i];
                                }
                                else {
                                    vm.list[i] = {
                                        name: 'Loading...',
                                        type: -1
                                    }
                                }
                            }
                        }
                        //we're not purgint the list, just adding new items to it
                        //this way, we should start filling the array from the cursorPosition - 1 (as it starts from 1)
                        else {
                            for(i=0;i<list.list.length;i++) {
                                console.log(i, list.list[i].name);
                                vm.list[vm.cursorPosition-1+i] = list.list[i];
                            }
                        }
                        $scope.$apply();
                    });
                };

                vm.listItemClick = function (value, type, $event) {
                    //jump to this line
                    if(type === -1) return false;
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
                        //we should use a really small timeout here before requesting a new page
                        //this will prevent us from hitting a bigger timeout in the library
                        //while the list is busy switching the page
                        //The value here is the lowest I can get without compromising stability
                    //TODO: deal with the same pages being loaded twice (hence the gaps in the list)
                        .then(function () {
                            return $timeout(function () {
                                
                            },200)
                        })
                        //then update the list
                        .then(function () {
                            return vm.updateList(purgeList);
                        });
                };


                vm.getFullList = function () {
                    var numPages = Math.ceil(vm.max / 8),
                        promise = Promise.resolve(), i;
                    for (i = 1; i < numPages; i++) {
                        promise = promise.then(vm.nextPage);
                    }
                    return promise;
                }

            },
            controllerAs: 'eightList',
            templateUrl: '/app/components/directives/eightList/eightList.tmpl.html'
        };
    });
