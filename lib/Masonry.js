/**
 * Created by apuc0 on 17.03.2018.
 */
function Masonry() {
    this.init = function (options, _cg) {
        this._cg = _cg;
        this.smaller = null;
        this.smallerSibling = null;
        this.smallerSiblingHeight = null;
        this.smallerPrevSibling = null;
        this.smallerNextSibling = null;

        this.defaultParams = {
            cards: document.querySelectorAll('.card'),
            cols: 4,
            width: 300,
            columnGapBottom: 0,
            columnGapRight: 0
        };

        this.event = new MasonryEvents(options.events);
        this.options = this._cg.setOptions(this.defaultParams, options);

        this.firstRow();
        this.rows();
    };

    this.reInit = function () {
        this.firstRow();
        this.rows();
    };

    this.firstRow = function () {
        for ( var i = 0; i < this.options.cols; i++ ) { // Цикл по элементам, которые попадают в первую строку
            this.event.beforeRenderElement(this.options.cards[i]);
            this.options.cards[i].classList.add('topEl'); // Добавляем класс, указывая, что под этот элемент можно установить еще один
            if ( this.options.cards[i] === this.options.cards[0] ) { // Первому элементу в строке устанавливаем свойства top & left в ноль
                this.options.cards[i].style.left = 0;
                this.options.cards[i].style.top = 0;
            } else { // Всем остальным свойство left равное свойству left предыдущего плюс ширина предыдущего
                this.options.cards[i].style.left = this.options.cards[i - 1].offsetLeft + this.options.columnGapRight + this.options.width  + 'px';
            }
            this.event.afterRenderElement(this.options.cards[i]);
        }
    };

    this.rows = function () {
        for ( var i = 0; i < this.options.cards.length; i++ ) {

            this.options.cards[i].style.width = this.options.width + 'px'; // Устанавливаем ширину для каждого элемента заданную в инициализации
            if (i >= this.options.cols) { // Проходим по всем элементам, начиная с того, который не попал в первую строку (метод FirstRow())
                if (this.options.cards[i].classList.contains('card-2')) {
                	this.options.cards[i].style.width = this.defaultParams.width * 2 + this.defaultParams.columnGapRight + 'px';
                    this.getSmaller();
                    this.options.cards[i].classList.add('topEl');
                    if (this.smaller.offsetLeft > this.smallerSiblingHeight) {
                        this.options.cards[i].style.left = this.smaller.offsetLeft + 'px';
                        
                    }
                    else {
                        this.options.cards[i].style.left = this.smallerSiblingHeight + 'px';
                    }
                    this.options.cards[i].style.top = this.smallerSiblingHeight + this.options.columnGapBottom + 'px';
                    console.log(this.smallerSiblingHeight)
                }
                else {
                	this.event.beforeRenderElement(this.options.cards[i]);
	                this.getSmaller(); // Записываем в переменную элемент, под который упадет следующий
	                this.options.cards[i].classList.add('topEl'); // Задаем класс новому элементу
	                this.options.cards[i].style.left = this.smaller.offsetLeft + 'px'; // Устанавливаем свойство left элементу, равное свойству left того элемента, под которого он падает
	                this.options.cards[i].style.top = this.smaller.offsetTop + this.options.columnGapBottom + this.smaller.offsetHeight + 'px'; // Устанавливаем свойство top элементу, равное отступу сверху + высоте того элемента, под которого падает блок
	                this.event.afterRenderElement(this.options.cards[i]);
                    if (this.smaller.classList.contains('card-2')) {
                        this.options.cards[i].style.left = (this.smaller.offsetLeft - this.defaultParams.columnGapRight) / 2;
                    }
                }
            }
        }
    };

    this.getSmaller = function() {
        var topEl = document.querySelectorAll('.topEl'); // Получаем все элементы, под которые можно складывать следующие
        this.smaller = topEl[0]; // Начальное значение переменной будет первый элемент в полученном списке
        for (var i = 0; i < topEl.length; i++) {
            if (this.smaller.offsetTop + this.smaller.offsetHeight > topEl[i].offsetTop + topEl[i].offsetHeight) {
                this.smaller = topEl[i]; // Находим элемент с самым меньшим расстоянием от верха
                this.smallerPrevSibling = this.smaller.previousElementSibling;
                this.smallerNextSibling = this.smaller.nextElementSibling;

                if (this.smallerNextSibling.offsetHeight + this.smallerNextSibling.offsetTop > this.smallerPrevSibling.offsetHeight + this.smallerPrevSibling.offsetTop) {
                	this.smallerSibling = this.smallerPrevSibling;
                	this.smallerSiblingHeight = this.smallerPrevSibling.offsetHeight + this.smallerPrevSibling.offsetTop;
                }
            }
        }
        this.smaller.classList.remove('topEl'); // Удаляем у него класс
        return this.smaller, this.smallerSiblingHeight; // Возвращаем его
    };
}

_CG.masonry = function (options) {
    if (this.hasExtension('mas')) {
        this.mas.options = this.setOptions(this.mas.options, options);
        return this.mas;
    }
    var mas = new Masonry();
    this.addExtension('mas', mas);
    return mas.init(options, this);
};