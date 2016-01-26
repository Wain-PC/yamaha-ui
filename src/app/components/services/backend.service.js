(function () {
    'use strict';
    angular
        .module('yamahaUi')
        .service('yamahaBackend', function (yamahaJS, pubSub) {
            var _self = this;

            pubSub.addEvent({
                name: 'backend:change',
                getter: function () {
                    return {
                        settings: _self.settings,
                        zones: _self.zones,
                        allInputs: _self.allInputs
                    }
                }
            });

            this.settings = {
                network: {}
            };
            this.allInputs = [];
            this.zones = [];
            this.zoneNumber = [];

            this.getZonesConfig = function () {
                return _self.zones.reduce(function (promise, zone, index) {
                    return promise.then(yamahaJS.getZoneConfig.bind(yamahaJS, zone, true)).then(function (config) {
                        _self.zones[index] = {
                            id: _self.zones[index]
                        };
                        angular.extend(_self.zones[index], config);
                    })
                }, Promise.resolve());
            };

            this.getZonesBasicInfo = function () {
                return _self.zones.reduce(function (promise, zone, index) {
                    return promise
                        .then(function () {
                            yamahaJS.activeZone = index+1;
                        })
                        .then(yamahaJS.getBasicInfo.bind(yamahaJS,true))
                        .then(function (basicInfo) {
                            angular.extend(zone,basicInfo);
                    })
                }, Promise.resolve());
            };

            this.getNetworkConfig = function () {
                return yamahaJS.network.getInfo()
                    .then(function (arr) {
                        _self.settings.network.name = arr[0];
                        _self.settings.network.standby = arr[1];
                        _self.settings.network.macFilter = arr[2];
                    });
            };

            //startup sequence
            //Step 1. Get system config
            yamahaJS.getSystemConfig(true)
            //Step 2. Apply the config to settings
                .then(function (config) {
                    _self.allInputs = config.availableInputs;
                    _self.zones = config.availableZones;
                    _self.zoneNumber = _self.zones.length;

                    _self.settings.modelName = config.modelName;
                    _self.settings.systemId = config.systemId;
                    _self.settings.version = config.version;
                })

                //Step 3. Get config for each zone
                .then(this.getZonesConfig)

                //Step 4. Get network settings (Network Name, Standby, MAC Filter
                .then(this.getNetworkConfig)
                .then(this.getZonesBasicInfo)
                //Step 5. Notify everyone about the changes
                .then(function () {
                    pubSub.notify('backend:change');
                })
        });
})();