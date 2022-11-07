var socket = io();
socket.emit("load_information");
socket.on("total_inventory", (msg) => {
    myChartPie.data.datasets[0].data[0] = msg.chocolate;
    myChartPie.data.datasets[0].data[1] = msg.vanilla;
    myChartPie.data.datasets[0].data[2] = msg.oreo;
    myChartPie.data.datasets[0].data[3] = msg.strawberry;
    myChartPie.data.datasets[0].data[4] = msg.berries;
    myChartPie.update()
    })


