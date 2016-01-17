(function () {
    'use strict';

    angular
        .module('yamahaUi')
        .controller('MainController', function (yamahaBackend) {
            this.isMuted = false;
            this.openMenu = function ($mdOpenMenu, ev) {
                $mdOpenMenu(ev);
            };
            this.zones = yamahaBackend.zones;

            this.changeInput = function (link, inputName) {
                link.input = inputName;
            };
        });
})();
