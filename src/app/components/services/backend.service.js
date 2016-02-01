(function () {
    'use strict';
    angular
        .module('yamahaUi')
        .service('yamahaBackend', function (yamahaJS, pubSub, throttler) {
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
                currentVolume: {
                    method: 'setVolume'
                },
                isMuted: {
                    method: 'setMute'
                },
                isOn: {
                    method: 'switchPower'
                },
                currentInput: {
                    method: 'setInputTo'
                },
                enhancer: {
                    method: 'setEnhancer',
                    noZone: true
                },
                pureDirect: {
                    method: 'setPureDirect',
                    noZone: true
                }
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
                                changedProps = _self.getChangedProperties(zone, oldZone);
                            if (changedProps.length) {
                                return changedProps.reduce(function (promise, changedProperty) {
                                        return promise.then(function () {
                                            return _self.callYamahaMethod(zoneId, changedProperty.property, changedProperty.newValue);
                                        });
                                    }, Promise.resolve());
                                    /*.then(function () {
                                        _self.debouncedGetMainZoneBasicInfo();
                                    });*/
                            }
                        });
                    })
                }, Promise.resolve());
            };

            this.getZonesBasicInfo = function () {
                return _self.zones.reduce(function (promise, zone, index) {
                    return promise
                        .then(_self.getZoneBasicInfo.bind(_self, zone))
                        .then(function (basicInfo) {
                            angular.extend(zone, basicInfo);
                            zone.inputs = _self.allInputs;
                        })
                }, Promise.resolve());
            };

            this.getZoneBasicInfo = function (zone) {
                return yamahaJS.getBasicInfo(zone.id, true)
                    .then(function (basicInfo) {
                        angular.extend(zone, basicInfo);
                        zone.inputs = _self.allInputs;
                    });
            };

            this.debouncedGetMainZoneBasicInfo = throttler.debounce(function () {
                return _self.getZoneBasicInfo(_self.zones[0]);
            }, 500, this);

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

            this.getChangedProperties = function (newObject, oldObject) {
                var propName, changedPropsArray = [];
                for (propName in oldObject) {
                    if (oldObject.hasOwnProperty(propName) && newObject.hasOwnProperty(propName)) {
                        if (oldObject[propName] !== newObject[propName]) {
                            changedPropsArray.push({
                                property: propName,
                                oldValue: oldObject[propName],
                                newValue: newObject[propName]
                            });
                        }
                    }
                }
                return changedPropsArray;
            };

            this.callYamahaMethod = function (zoneId, propName, propValue) {
                var methodName = this.propertyToMethodZoneTable[propName];
                if (methodName && methodName.method) {
                    //TODO:after the actual method has been called, we must verify that the actual value has been updated
                    //this should probably be debounced
                    if (methodName.noZone) {
                        return yamahaJS[methodName.method](propValue);
                    }
                    return yamahaJS[methodName.method](zoneId, propValue);
                }
                else {
                    console.error("No method found for changed property %s", propName);
                    return Promise.reject(null)
                }
            };


            this.setMainZoneScene = function (num) {
                return yamahaJS.setScene(num)
                    .then(function () {
                        return _self.debouncedGetMainZoneBasicInfo();
                    })
                    .then(function () {
                        pubSub.notify('backend:change');
                    })
            };

            this.startup = function () {
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
            };


            //Startup goes here
            this.startup();
        });
})();