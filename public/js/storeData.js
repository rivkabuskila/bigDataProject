var socket = io();

var btn = document.querySelector("button");
btn.onclick = async function () {
  var store = {}
  store.City =  select.options[select.selectedIndex].value
  store.Flavor = select_flavor.options[select_flavor.selectedIndex].value
  console.log(store);
  await socket.emit("store", store);
  await socket.on("store_inventory", (msg) => {
    console.log(msg)
    myChart.data.datasets[0].data[0] = msg.store.chocolate;
    myChart.data.datasets[0].data[1] = msg.store.vanilla;
    myChart.data.datasets[0].data[2] = msg.store.oreo;
    myChart.data.datasets[0].data[3] = msg.store.strawberry;
    myChart.data.datasets[0].data[4] = msg.store.berries;
    myChart.update();
    line_chart.data.datasets[0].data=msg.week
    line_chart.update();

  });
}
