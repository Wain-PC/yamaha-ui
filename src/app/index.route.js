(function () {
    'use strict';

    angular
        .module('yamahaUi')
        .config(routerConfig);

    /** @ngInject */
    function routerConfig($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('welcome', {
                url: '/welcome',
                templateUrl: 'app/welcome/welcome.html',
                controller: 'WelcomeController',
                controllerAs: 'welcome'
            })
            .state('main', {
                url: '/',
                templateUrl: 'app/main/main.html',
                controller: 'MainController',
                controllerAs: 'main'
            })
            .state('zone1', {
                url: '/zone1',
                templateUrl: 'app/zone1/zone1.html',
                controller: 'Zone1Controller',
                controllerAs: 'zone1'
            })
            .state('zone2', {
                url: '/zone2',
                templateUrl: 'app/zone2/zone2.html',
                controller: 'Zone2Controller',
                controllerAs: 'zone2'
            })
            .state('settings', {
                url: '/settings',
                templateUrl: 'app/settings/settings.html',
                controller: 'SettingsController',
                controllerAs: 'settings'
            })
            .state('remote', {
                url: '/remote',
                templateUrl: 'app/remote/remote.html',
                controller: 'RemoteController',
                controllerAs: 'remote'
            });



        $urlRouterProvider.otherwise('/');
    }

})();
