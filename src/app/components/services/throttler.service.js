/**
 * @memberof yamahaUi
 * @ngdoc service
 * @name throttler
 * @description
 *  Методы-обертки для троттлинга и дебаунсинга функций
 *  @param {service} $timeout
 */
angular
    .module('yamahaUi')
    .factory('throttler', function ($timeout) {

        /**
         * Метод-обертка для дебаунсинга функции.
         * @description  Результирующая функция будет выполнена только 1 раз за последующие wait мс.
         * Все вызовы, произошедшие до wait мс с момента вызова НЕ БУДУТ исполнены
         * @memberof throttler
         * @param {Function} func Функция, которая будет выполнена
         * @param {Number} wait Задержка выполнения в мс
         * @param {Context} context Контекст выполнения функции
         * @returns {Function} Обернутая функция
         */
        function debounce(func, wait, context) {
            var timer;
            return function debounced() {
                var args = Array.prototype.slice.call(arguments);
                $timeout.cancel(timer);
                timer = $timeout(function () {
                    timer = undefined;
                    func.apply(context, args);
                }, wait || 100);
            };
        }

        /**
         * Метод-обертка для троттлинга функции.
         * @description  Результирующая функция будет выполняться не чаще, чем 1 раз в wait мс
         * @memberof throttler
         * @param {Function} func Функция, которая будет выполнена
         * @param {Number} wait Задержка выполнения в мс
         * @param {Context} context Контекст выполнения функции
         * @returns {Function} Обернутая функция
         */
        function throttle(func, wait, context) {
            wait = wait || 500;
            var last,
                deferTimer;
            return function () {
                var context = context || this;

                var now = +new Date,
                    args = arguments;
                if (last && now < last + wait) {
                    // hold on to it
                    $timeout.cancel(deferTimer);
                    deferTimer = $timeout(function () {
                        last = now;
                        func.apply(context, args);
                    }, wait);
                } else {
                    last = now;
                    func.apply(context, args);
                }
            };
        }

        return {
            throttle: throttle,
            debounce: debounce
        }
    });
