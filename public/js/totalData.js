var socket = io();
socket.emit("load_information");
socket.on("total_inventory", (msg) => {
    var myTable = document.getElementById('myTable');
    myTable.rows[1].cells[1].innerHTML = msg.chocolate;
    myTable.rows[2].cells[1].innerHTML = msg.vanilla;
    myTable.rows[3].cells[1].innerHTML = msg.oreo;
    myTable.rows[4].cells[1].innerHTML = msg.strawberry;
    myTable.rows[5].cells[1].innerHTML = msg.berries;
    })



