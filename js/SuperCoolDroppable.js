var SuperCoolDroppable = function (elems) {
    CoolDroppable.apply(this, arguments);
    this.classes = ['droppable_border', 'droppable_background'];
};

extend(SuperCoolDroppable, CoolDroppable);
