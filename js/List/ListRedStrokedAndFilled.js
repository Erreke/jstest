var ListRedStrokedAndFilled = function () {
    this.lists = [];
    this.mainLists = document.querySelectorAll('.list_type_simple');
    this.clone = null;
};

ListRedStrokedAndFilled.prototype = Object.create(ListRedStroked.prototype);

ListRedStrokedAndFilled.prototype.callback = function(that){
    var self = that;
    that.clone = that.target.el.cloneNode(true);

    that.mainLists.forEach(function (item) {
        item.appendChild(self.clone);
    });

    if (that.clone.classList.contains(that.classes.listItemDragging)) {
        that.clone.classList.remove(that.classes.listItemDragging);
        that.clone.removeAttribute('style');
    }

    that.lists.forEach(function (item) {
        item.classList.add(self.classes.redFilled);
    });

    setTimeout(function(){
        self.lists.forEach(function (item) {
            item.classList.remove(self.classes.redFilled);
        });
    }, 1000);
};

ListRedStrokedAndFilled.prototype.moveTargetToNewList = function (e) {
    if (this.target) {
        ListRedStroked.prototype.moveTargetToNewList.call(this, e, this.callback);
    }
};
