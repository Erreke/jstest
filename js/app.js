function start() {
    var list = new List(),
        listRedStroked = new ListRedStroked(),
        listRedStrokedAndFilled = new ListRedStrokedAndFilled();

    var simpleLists = document.querySelectorAll('.list_type_simple'),
        redStrokedLists = document.querySelectorAll('.list_type_red-stroked'),
        redStrokedAndFilledLists = document.querySelectorAll('.list_type_red-stroked-and-filled');

    list.init(simpleLists);
    listRedStroked.init(redStrokedLists);
    listRedStrokedAndFilled.init(redStrokedAndFilledLists);
}

document.addEventListener('DOMContentLoaded', start);
