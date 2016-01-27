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

            this.propertyToMethodZoneTable = {
                currentVolume: 'setVolume',
                isMuted: 'setMute',
                isOn: 'switchPower'
            };

            this.getZonesConfig = function () {
                return _self.zones.reduce(function (promise, zone, index) {
                    return promise.then(yamahaJS.getZoneConfig.bind(yamahaJS, zone, true)).then(function (config) {
                        _self.zones[index] = {
                            id: _self.zones[index]
                        };
                        angular.extend(_self.zones[index], config);
                        pubSub.subscribe('frontend:change:' + _self.zones[index].id, null, function (event, oldZone) {
                            var zoneId = event.name.split(':').pop(),
                                zone = _self.getZoneById(zoneId),
                                propName = _self.getChangedProperty(zone, oldZone);
                            if(propName) {
                                _self.callYamahaMethod(zoneId, propName.property, propName.newValue);
                            }
                        });
                    })
                }, Promise.resolve());
            };

            this.getZonesBasicInfo = function () {
                return _self.zones.reduce(function (promise, zone, index) {
                    return promise
                        .then(yamahaJS.getBasicInfo.bind(yamahaJS, zone.id, true))
                        .then(function (basicInfo) {
                            angular.extend(zone, basicInfo);
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

            this.getZoneById = function (zoneId) {
                var i = 0, length = this.zones.length;
                for (i = 0; i < length; i++) {
                    if (this.zones[i].id === zoneId) {
                        return this.zones[i];
                    }
                }
                return null;
            };

            this.getChangedProperty = function (newObject, oldObject) {
                var propName;
                for (propName in oldObject) {
                    if (oldObject.hasOwnProperty(propName) && newObject.hasOwnProperty(propName)) {
                        if (oldObject[propName] !== newObject[propName]) {
                            return {
                                property: propName,
                                oldValue: oldObject[propName],
                                newValue: newObject[propName]
                            }
                        }
                    }
                }
                return null;
            };

            this.callYamahaMethod = function (zoneId, propName, propValue) {
                var methodName = this.propertyToMethodZoneTable[propName];
                if(methodName) {
                    //TODO:after the actual method has been called, we must verify that the actual value has been updated
                    //this should probably be debounced
                    yamahaJS[methodName](zoneId, propValue);
                }
                else {
                    console.error("No method found for changed property %s", propName);
                }
            };


            //startup sequence
            //Step 1.1 Get service info
            yamahaJS.getSystemServiceInfo()
                //Step 1.2 Get system config
                .then(yamahaJS.getSystemConfig.bind(yamahaJS, true))
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
                });
        });
})();