var ListRedStroked = function () {
    this.lists = [];
};

ListRedStroked.prototype = Object.create(List.prototype);

ListRedStroked.prototype.moveTargetToNewList = function () {
    List.prototype.moveTargetToNewList.apply(this, arguments);

    var self = this;
    
    this.lists.forEach(function (item) {
        item.classList.add(self.classes.redStroked);
    });
    
    setTimeout(function(){
        self.lists.forEach(function (item) {
            item.classList.remove(self.classes.redStroked);
        });
    }, 1000);
};
