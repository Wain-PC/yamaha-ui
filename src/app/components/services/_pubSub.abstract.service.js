(function () {
    'use strict';

    /**
     * @memberof yamahaUi
     * @ngdoc service
     * @name pubSub
     * @description
     *  Абстрактный сервис, позволяющий другим сервисам расширять его и после этого давать подписываться на изменения
     */
    angular
        .module('yamahaUi')
        .service('pubSub', function ($rootScope, throttler) {
            // {eventName, callback, scope}
            var subscribers = [],
            // {name, getter}
                events = {};

            /**
             * Рассылает уведомления об изменении данных всем подписавшимся контроллерам
             * @description В целях улучшения производительности рассылка производится не более 1 раза в секунду
             * @private
             */
            var notify = throttler.throttle(
                function (eventName) {
                    if (!subscribers.length) {
                        //console.error(`Trying to emit event '${eventName}' while it has no subscribers`);
                        return false;
                    }
                    if (!events[eventName]) {
                        if (this.events) {
                            console.error('Trying to emit event' + eventName + 'while it has no getter set');
                        }
                        return false;
                    }
                    subscribers.some(function (subscriber) {
                        if (subscriber.eventName === eventName) {
                            $rootScope.$emit(eventName, events[subscriber.eventName]());
                            return true;
                        }
                        return false;
                    });
                },
                1000,
                this);

            /**
             * Позволяет подписаться на изменения в сущностях данных
             * @memberof websocket
             * @description Коллбек будет вызван каждый раз, когда какая-либо из сущностей данных изменится (добавится или удалится)
             * @param {String} eventName Название события, на которое происходит подписка
             * @param {Object} scope Контекст, в котором будет выполняться callback
             * @param {Function} callback Функция, которая будет выполнена при получении события
             * @param {Boolean} immediate Если true, то геттер сработает сразу при подписке
             */
            var subscribe = function (eventName, scope, callback, immediate) {
                if (!scope) {
                    scope = $rootScope;
                }

                subscribers.some(function (subscriber, index) {
                    if (subscriber.eventName === eventName && subscriber.scopeContext === scope) {
                        subscriber.handler();
                        subscribers.splice(index, 1);
                        return true;
                    }
                    return false;
                });

                var handler = $rootScope.$on(eventName, callback);
                scope.$on('$destroy', handler);
                scope.$on('$destroy', function () {
                    //pass through each subscriber and find one with the matching properties
                    subscribers.forEach(function (subscriber, index) {
                        if (subscriber.eventName === eventName &&
                            subscriber.scopeContext === scope &&
                            subscriber.callback === callback) {
                            //remove the subscriber from the array when found
                            subscribers.splice(index, 1);
                        }
                    })
                });

                subscribers.push({
                    eventName: eventName,
                    scopeContext: scope,
                    callback: callback,
                    handler: handler
                });

                if(immediate) {
                    //subscriber must receive the latest data immediately on subscription
                    //so let's notify it
                    notify(eventName);
                }
            };

            var addEvent = function (event) {
                var result = (typeof event === 'object' && event.name && event.getter);
                if (result) {
                    events[event.name] = event.getter;
                }
                return result;
            };

            var addEvents = function (eventsList) {
                var result = false,
                    eventName, event;
                for (eventName in eventsList) {
                    if (eventsList.hasOwnProperty(eventName)) {
                        event = eventsList[eventName];
                        if (addEvent(event)) {
                            result = true;
                        }
                    }
                }
                return result;
            };

            return {
                subscribe: subscribe,
                notify: notify,
                addEvent: addEvent,
                addEvents: addEvents
            }
        });
})();
