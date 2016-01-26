(function () {
    'use strict';
    angular
        .module('yamahaUi')
        .service('yamahaBackend', function () {
            this.zones = [
                {
                    href: '/zone1',
                    icon: 'school',
                    text: 'Main zone',
                    on: true,
                    volume: -32.5,
                    input: 'HDMI1',
                    soundProgram: '2ch Stereo',
                    isMuted: false,
                    sleepTimer: 30,
                    enhancer: true,
                    inputs: [{
                        name: 'HDMI1',
                        icon: 'home'
                    }, {
                        name: 'HDMI2',
                        icon: 'home'
                    }, {
                        name: 'HDMI3',
                        icon: 'home'
                    }, {
                        name: 'HDMI4',
                        icon: 'home'
                    }, {
                        name: 'AV1',
                        icon: 'star'
                    }, {
                        name: 'AV2',
                        icon: 'star'
                    }, {
                        name: 'AV3',
                        icon: 'star'
                    }, {
                        name: 'AV4',
                        icon: 'star'
                    }, {
                        name: 'AV5',
                        icon: 'star'
                    }, {
                        name: 'AV6',
                        icon: 'star'
                    }, {
                        name: 'USB',
                        icon: 'usb'
                    }, {
                        name: 'AirPlay',
                        icon: 'airplay'
                    }, {
                        name: 'NET RADIO',
                        icon: 'wifi'
                    }, {
                        name: 'TUNER',
                        icon: 'radio'
                    }],
                    soundPrograms: [
                        {
                            name: '2ch Stereo',
                            icon: 'star'
                        }, {
                            name: '7ch Stereo',
                            icon: 'star'
                        }, {
                            name: 'Hall in Vienna',
                            icon: 'star'
                        }, {
                            name: 'Hall in Munich',
                            icon: 'star'
                        }, {
                            name: 'One',
                            icon: 'star'
                        }, {
                            name: 'Two',
                            icon: 'star'
                        }, {
                            name: 'Three',
                            icon: 'star'
                        }, {
                            name: 'Straight',
                            icon: 'star'
                        }

                    ],
                    scenes: [
                        {
                            name: 'Scene 1',
                            icon: 'star'
                        },
                        {
                            name: 'Scene 2',
                            icon: 'star'
                        },
                        {
                            name: 'Scene 3',
                            icon: 'star'
                        },
                        {
                            name: 'Scene 4',
                            icon: 'star'
                        }
                    ],
                    tuner: {
                        frequency: 95.2,
                        type: 'FM'
                    }
                },
                {
                    href: '/zone2',
                    icon: 'play_circle_fill',
                    text: 'Zone 2',
                    on: true,
                    volume: -60.0,
                    input: 'HDMI2',
                    isMuted: false,
                    sleepTimer: 30,
                    inputs: [{
                        name: 'AV5',
                        icon: 'star'
                    }, {
                        name: 'AV6',
                        icon: 'star'
                    }, {
                        name: 'USB',
                        icon: 'usb'
                    }, {
                        name: 'AirPlay',
                        icon: 'airplay'
                    }, {
                        name: 'NET RADIO',
                        icon: 'wifi'
                    }]
                },
                {
                    href: '/zone3',
                    icon: 'build',
                    text: 'Zone 3',
                    on: false,
                    volume: -46.5,
                    input: 'HDMI3',
                    isMuted: false,
                    sleepTimer: 60
                },
                {
                    href: '/zone4',
                    icon: 'code',
                    text: 'Zone 4',
                    on: false,
                    volume: 0.0,
                    input: 'HDMI4',
                    isMuted: false,
                    sleepTimer: 120
                }
            ];

            this.settings = {
                bass: 1,
                treble: 3,
                subwoofer: 2,
                dialogue: 0,
                dialogueLift: 1
            };

            this.openMenu = function ($mdOpenMenu, ev) {
                $mdOpenMenu(ev);
            };
        });
})();