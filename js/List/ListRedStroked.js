var ListRedStroked = function () {
    this.lists = [];
};

ListRedStroked.prototype = Object.create(List.prototype);

ListRedStroked.prototype.callback = function(that){
    var self = that;

    that.lists.forEach(function (item) {
        item.classList.add(self.classes.redStroked);
    });

    setTimeout(function(){
        self.lists.forEach(function (item) {
            item.classList.remove(self.classes.redStroked);
        });
    }, 1000);
};

ListRedStroked.prototype.moveTargetToNewList = function (e, callback) {
    if (callback) callback(this);
    if (this.target) {
        List.prototype.moveTargetToNewList.call(this, e, this.callback);
    }
};
