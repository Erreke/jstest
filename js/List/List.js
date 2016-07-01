var List = function () {
    this.lists = [];
};

List.prototype.dropTo = null;
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

    this.target.el = e.target;
    this.target.y = coords.top;
    this.target.height = coords.height;
    this.target.downY = e.pageY;
};

List.prototype.onMouseMove = function (e) {
    if (!this.target.el) return false;

    var top = e.pageY - (this.target.downY - this.target.y),
        availableBottomY = document.body.clientHeight - this.target.height,
        availableTopY = 0;

    if (availableTopY <= top && availableBottomY >= top) {
        this.target.el.classList.add(this.classes.listItemDragging);
        this.target.el.style.top = top + 'px';
    }
};

List.prototype.onMouseEnter = function (e) {
    if (!this.target.el) return false;

    this.dropTo =  e.currentTarget;

    console.log('MouseEnter', e.currentTarget);
};

List.prototype.onMouseLeave = function () {
    this.dropTo =  null;
};

List.prototype.onMouseUp = function (e) {
    //console.log('dropTo', this.dropTo);
    //console.log('target', this.target.el);

    if (this.target.el && this.dropTo) {
        this.moveTargetToNewList(e);
    } else {
        this.revertAll();
    }
};

List.prototype.moveTargetToNewList = function (e, callback) {
    if(this.dropTo.classList.contains(this.classes.list)) {
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
        if (this.target.el.classList.contains(this.classes.listItemDragging)) {
            this.target.el.classList.remove(this.classes.listItemDragging);
            this.target.el.removeAttribute('style');
            this.target.el = null;
        }
    }
};

List.prototype.init = function (lists) {
    Array.prototype.forEach.call(lists, function (item) {
        this.lists.push(item);

        item.addEventListener('mousedown', this.onMouseDown.bind(this));
        item.addEventListener('mousemove', this.onMouseMove.bind(this));
        item.addEventListener('mouseenter', this.onMouseEnter.bind(this));
        item.addEventListener('mouseleave', this.onMouseLeave.bind(this));
        item.addEventListener('mouseup', this.onMouseUp.bind(this));

    }, this);

    /*document.addEventListener('mousedown', this.onMouseDown.bind(this));
    document.addEventListener('mousemove', this.onMouseMove.bind(this));
    document.addEventListener('mouseup', this.onMouseUp.bind(this));*/

    //document.addEventListener('mouseup', this.revertAll.bind(this));
};
