var ListRedStrokedAndFilled = function () {
    this.containers = [];
    this.simpleContainers = document.querySelectorAll('.list_type_simple');
    this.clone = null;
};

ListRedStrokedAndFilled.prototype = Object.create(ListRedStroked.prototype);

ListRedStrokedAndFilled.prototype.copyNodeToMainList = function () {
    var self = this;

    this.clone = this.target.el.cloneNode(true);
    this.simpleContainers.forEach(function (item) {
        item.appendChild(self.clone);
    });

    if (this.clone.classList.contains(this.classes.listItemDragging)) {
        this.clone.classList.remove(this.classes.listItemDragging);
        this.clone.removeAttribute('style');
    }
};

ListRedStrokedAndFilled.prototype.addRedFill = function (that) {
    var self = that;

    that.copyNodeToMainList();
    that.containers.forEach(function (item) {
        item.classList.add(self.classes.redFilled);
    });

    setTimeout(function () {
        self.containers.forEach(function (item) {
            item.classList.remove(self.classes.redFilled);
        });
    }, 1000);
};

ListRedStrokedAndFilled.prototype.moveTargetToNewList = function (e) {
    ListRedStroked.prototype.moveTargetToNewList.call(this, e, this.addRedFill);
};
