var Droppable = function (elems) {
    this.elems = elems;

    for (var i = 0, len = this.elems.length; i < len; i++) {
        this.elems[i].addEventListener('dragstart', this.dragStart.bind(this));
        this.elems[i].addEventListener('dragover', this.dragOver);
        this.elems[i].addEventListener('drop', this.drop.bind(this));
    }
};

Droppable.prototype.dragStart = function (e) {
    dragManager.element = e.target;
    dragManager.giver = e.currentTarget;
    e.dataTransfer.setData('text/html', '');
};

Droppable.prototype.dragOver = function (e) {
    if (e.preventDefault) e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
    return false;
};

Droppable.prototype.drop = function (e) {
    dragManager.taker = e.currentTarget;

    if (dragManager.taker != dragManager.giver) {
        dragManager.taker.appendChild(dragManager.element);
    }
};
