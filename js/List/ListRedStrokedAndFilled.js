var ListRedStrokedAndFilled = function () {
    this.lists = [];
    this.mainLists = document.querySelectorAll('.list_type_simple');
    this.clone = null;
};

ListRedStrokedAndFilled.prototype = Object.create(ListRedStroked.prototype);

ListRedStrokedAndFilled.prototype.moveTargetToNewList = function () {
    ListRedStroked.prototype.moveTargetToNewList.apply(this, arguments);

    var self = this;
    this.clone = this.target.el.cloneNode(true);

    this.mainLists.forEach(function (item) {
        item.appendChild(self.clone);
    });

    if (this.clone.classList.contains(this.classes.listItemDragging)) {
        this.clone.classList.remove(this.classes.listItemDragging);
        this.clone.removeAttribute('style');
    }

    this.lists.forEach(function (item) {
        item.classList.add(self.classes.redFilled);
    });

    setTimeout(function(){
        self.lists.forEach(function (item) {
            item.classList.remove(self.classes.redFilled);
        });
    }, 1000);
};
