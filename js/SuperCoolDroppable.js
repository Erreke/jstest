var SuperCoolDroppable = function (elems) {
    CoolDroppable.apply(this, arguments);
    this.classes = ['droppable_border', 'droppable_background'];
};

extend(SuperCoolDroppable, CoolDroppable);

SuperCoolDroppable.prototype.drop = function (e) {
    CoolDroppable.prototype.drop.apply(this, arguments);

    if (dragManager.taker != dragManager.giver) {
        var clone = dragManager.element.cloneNode(true);

        for (var i = 0, len = droppable.elems.length; i < len; i++) {
            droppable.elems[i].appendChild(clone);
        }
    }
};
