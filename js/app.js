var droppableElements = document.querySelectorAll('.droppable');
var coolDroppableElements = document.querySelectorAll('.cool_droppable');
var superCoolDroppableElements = document.querySelectorAll('.super_cool_droppable');

var dragManager = new DragManager();
var droppable = new Droppable(droppableElements);
var coolDroppable = new CoolDroppable(coolDroppableElements);
var superCoolDroppable = new SuperCoolDroppable(superCoolDroppableElements);
