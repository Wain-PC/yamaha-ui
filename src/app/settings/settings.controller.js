(function () {
    'use strict';

    angular
        .module('yamahaUi')
        .controller('SettingsController', function (yamahaBackend) {
            var vm = this;
            vm.opts = yamahaBackend.settings;
            vm.dhcp = true;
            vm.macAddress = ['000000000001',
                '000000000000',
                '0000a0000000',
                '000000f00000',
                '00000c000000',
                '000000000000',
                '000000d00000',
                '000000000000',
                '00030000a000',
                '000000000910'];

            vm.buttons = {
                bass: {min: -6, max: 6, step: '0.5', text: 'Bass'},
                treble: {min: -6, max: 6, step: '0.5', text: 'Treble'},
                subwoofer: {min: -6, max: 6, step: '0.5', text: 'Subwoofer'},
                dialogue: {min: 0, max: 3, step: '1', text: 'Dialogue'},
                dialogueLift: {min: 0, max: 3, step: '1', text: 'Dialogue lift'}
            };

            vm.openMenu = function ($mdOpenMenu, ev) {
                $mdOpenMenu(ev);
            };

            vm.range = function (n) {
                return new Array(n);
            };
        });
})();
