function ready() {
    var list = new List(),
        listRedStroked = new ListRedStroked(),
        listRedStrokedAndFilled = new ListRedStrokedAndFilled();

    list.init(document.querySelectorAll('.list'));
    //listRedStroked.init(document.querySelectorAll('.list_type_red-stroked'));
    //listRedStrokedAndFilled.init(document.querySelectorAll('.list_type_red-stroked-and-filled'));
}

document.addEventListener('DOMContentLoaded', ready);
