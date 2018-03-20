/**
 * @description Создаёт эксзепляр MasonryEvents
 * @constructor
 * @this {MasonryEvents}
 */
function MasonryEvents(events) {
    /** Константы названия событий*/
    var BEFORE_RENDER_ELEMENT = 'beforeRenderElement';
    var AFTER_RENDER_ELEMENT = 'afterRenderElement';

    /**
     * @description устанавливает пользовательские события
     * @param events
     */
    this.setEvents = function (events) {
        return this.events = events;
    };
    /**
     * @description установка пользовательских событий
     */
    this.setEvents(events);

    /**
     * @description событие вызываемое перед прорисовкой элемента
     * @param el
     */
    this.beforeRenderElement = function (el) {
        /** Код который будет выполнятся по умолчанию*/

        if (this.isUserEvent(BEFORE_RENDER_ELEMENT)) {
            this.events.beforeRenderElement(el);
        }
    };

    /**
     * @description событие вызываемое после прорисовки элемента
     * @param el
     */
    this.afterRenderElement = function (el) {
        /** Код который будет выполнятся по умолчанию*/

        if (this.isUserEvent(AFTER_RENDER_ELEMENT)){
            this.events.afterRenderElement(el);
        }
    };

    /**
     * @description метод проверяет была ли передана пользовательская функция для события eventName
     * @param eventName
     * @returns {boolean}
     */
    this.isUserEvent = function(eventName){
        if (this.events !== undefined) {
            return this.events.hasOwnProperty(eventName);
        }

        return false;
    }
}
