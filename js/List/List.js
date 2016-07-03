var List = function () {
    this.containers = [];
};

List.prototype.dropTo = null;
List.prototype.target = {
    el: null,
    y: 0,
    downY: 0,
    height: 0
};

List.prototype.classes = {
    list: 'list',
    listReadyToDrop: 'list_ready-to_drop',
    
    redStroked: 'list_stroked_red',
    redFilled: 'list_filled_red',

    listItem: 'list__item',
    listItemDragging: 'list__item_dragging_yes'
};

List.prototype.onMouseDown = function (e) {
    if (e.which != 1) return;

    if (!e.target.classList.contains(this.classes.listItem)) return;

    var coords = e.target.getBoundingClientRect();

    this.target.el = e.target;
    this.target.y = coords.top;
    this.target.height = coords.height;
    this.target.downY = e.pageY;
};

List.prototype.onMouseMove = function (e) {
    if (!this.target.el) return false;

    var top = e.pageY - (this.target.downY - this.target.y);

    this.target.el.classList.add(this.classes.listItemDragging);
    this.target.el.style.top = top + 'px';
};

List.prototype.onMouseEnter = function (e) {
    if (!this.target.el) return false;
    
    var dropTo = e.target;
    
    dropTo.classList.add(this.classes.listReadyToDrop);
    this.dropTo = dropTo;
};

List.prototype.onMouseLeave = function (e) {
    e.target.classList.remove(this.classes.listReadyToDrop);
    this.dropTo = null;
};

List.prototype.onMouseUp = function (e) {
    if (this.target.el && this.dropTo) {
        this.moveTargetToNewList(e);
    } else {
        this.revertAll();
    }
};

List.prototype.moveTargetToNewList = function (e, callback) {
    if (this.dropTo.classList.contains(this.classes.list)) {
        if (callback) callback(this);
        this.dropTo.appendChild(this.target.el);
        this.pushTargetToFlow();
    }
};

List.prototype.revertAll = function () {
    this.pushTargetToFlow();
};

List.prototype.pushTargetToFlow = function () {
    if (this.target.el) {
        this.target.el.classList.remove(this.classes.listItemDragging);
        this.target.el.removeAttribute('style');
        this.target.el = null;
    }
};

List.prototype.init = function (containers) {
    Array.prototype.forEach.call(containers, function (item) {
        this.containers.push(item);

        item.addEventListener('mousedown', this.onMouseDown.bind(this));
        item.addEventListener('mousemove', this.onMouseMove.bind(this));
        item.addEventListener('mouseenter', this.onMouseEnter.bind(this));
        item.addEventListener('mouseleave', this.onMouseLeave.bind(this));
        item.addEventListener('mouseup', this.onMouseUp.bind(this));

    }, this);
};
