(function () {
    'use strict';

    angular
        .module('yamahaUi')
        .controller('MainController', function ($scope, pubSub) {
            var watchersSet = false,
                _self = this;
            this.zones = [];
            pubSub.subscribe('backend:change', $scope, function (event, data) {
                var zoneId, i,
                    _self = this;
                //this will fill in the zones
                angular.extend(this.zones, data.zones);
                if(!watchersSet) {
                    watchersSet = true;
                    for(i=0;i<this.zones.length;i++) {
                        zoneId = this.zones[i].id;
                        //set watcher on each zone (if not previously set)
                        if(zoneId) {
                            pubSub.addEvent({
                                name: 'frontend:change:'+zoneId,
                                getter: function (i) {
                                    return function () {
                                        return _self.zones[i];
                                    }
                                }(i)
                            });

                            $scope.$watchCollection('main.zones['+i+']', function (newValue, oldValue) {
                                //send request with some property back to the service here
                                pubSub.notify('frontend:change:'+newValue.id, oldValue);
                            });
                        }
                    }
                }

            }.bind(this), true);


        });
})();
