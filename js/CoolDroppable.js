var CoolDroppable = function (elems) {
    Droppable.apply(this, arguments);
    this.classes = ['droppable_border'];
};

extend(CoolDroppable, Droppable);

CoolDroppable.prototype.drop = function (e) {
    Droppable.prototype.drop.apply(this, arguments);
    if (dragManager.taker != dragManager.giver) {
        var elems = this.elems,
            elemsClases = this.classes;

        for (var i = 0, len = elems.length; i < len; i++) {
            for (var j = 0, classLen = elemsClases.length; j < classLen; j++) {
                elems[i].classList.add(elemsClases[j]);
            }
        }

        var timer = setTimeout(function () {
            for (var i = 0, len = elems.length; i < len; i++) {
                for (var j = 0, classLen = elemsClases.length; j < classLen; j++) {
                    elems[i].classList.remove(elemsClases[j]);
                }
            }
        }, 1500);
    }
};

