var List = function () {
    this.lists = [];
};

List.prototype.dropTo = null;
List.prototype.isNowDragging = false;
List.prototype.isThisDroppable = false;
List.prototype.target = {
    el: null,
    height: 0,
    y: 0,
    downY: 0
};
List.prototype.classes = {
    list: 'list',
    listItem: 'list__item',
    listTypeSimple: 'list_type_simple',
    listTypeRedStroked: 'list_type_red-stroked',
    listTypeRedStrokedAndFilled: 'list_type_red-stroked-and-filled',
    listItemDragging: 'list__item_dragging_yes',
    redStroked: 'list_stroked_red',
    redFilled: 'list_filled_red'
};

List.prototype.onMouseDown = function (e) {
    if (e.which != 1) return;

    if (!e.target.classList.contains(this.classes.listItem)) return;

    var coords = e.target.getBoundingClientRect();

    this.isNowDragging = true;
    this.target.el = e.target;
    this.target.y = coords.top;
    this.target.height = coords.height;
    this.target.downY = e.pageY;
};

List.prototype.onMouseMove = function (e) {
    if (!this.isNowDragging) return false;

    this.target.el.hidden = true;
    var el = document.elementFromPoint(e.clientX, e.clientY);
    this.target.el.hidden = false;

    this.isThisDroppable = el.classList.contains(this.classes.list);

    if (this.isThisDroppable) {
        this.dropTo = el;
    }

    this.pullTargetFromFlow();
    this.movingTarget(e);
};

List.prototype.pullTargetFromFlow = function () {
    this.target.el.classList.add(this.classes.listItemDragging);
};

List.prototype.movingTarget = function (e) {
    var top = e.pageY - (this.target.downY - this.target.y),
        availableBottomY = document.body.clientHeight - this.target.height,
        availableTopY = 0;

    if (availableTopY <= top && availableBottomY >= top) {
        this.target.el.style.top = top + 'px';
    }
};

List.prototype.onMouseUp = function (e) {
    if (this.isNowDragging && this.isThisDroppable) {
        this.moveTargetToNewList(e);
    } else {
        this.revertAll();
    }
};

List.prototype.moveTargetToNewList = function () {
    this.dropTo.appendChild(this.target.el);
    this.pushTargetToFlow();
};

List.prototype.revertAll = function () {
    this.pushTargetToFlow();
};

List.prototype.pushTargetToFlow = function () {
    if (this.target.el) {
        if (this.target.el.classList.contains(this.classes.listItemDragging)) {
            this.target.el.classList.remove(this.classes.listItemDragging);
            this.target.el.removeAttribute('style');
        }
        this.isNowDragging = false;
        this.isThisDroppable = false;
    }
};

List.prototype.init = function (lists) {
    Array.prototype.forEach.call(lists, function (item) {
        this.lists.push(item);
        item.addEventListener('mousedown', this.onMouseDown.bind(this));
        item.addEventListener('mousemove', this.onMouseMove.bind(this));
        item.addEventListener('mouseup', this.onMouseUp.bind(this));
    }, this);

    document.addEventListener('mouseup', this.revertAll.bind(this));
};
