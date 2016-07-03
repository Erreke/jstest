var ListRedStroked = function () {
    this.containers = [];
};

ListRedStroked.prototype = Object.create(List.prototype);

ListRedStroked.prototype.addRedStroke = function (that) {
    var self = that;

    that.containers.forEach(function (item) {
        item.classList.add(self.classes.redStroked);
    });

    setTimeout(function () {
        self.containers.forEach(function (item) {
            item.classList.remove(self.classes.redStroked);
        });
    }, 1000);
};

ListRedStroked.prototype.moveTargetToNewList = function (e, callback) {
    if (callback) callback(this);

    List.prototype.moveTargetToNewList.call(this, e, this.addRedStroke);
};
