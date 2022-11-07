var btn = document.querySelector(".load");
btn.onclick = async function () {
  var value_store = select.options[select.selectedIndex].value;
  var value_falvor = select_flavor.options[select_flavor.selectedIndex].value;
  var select_date = document.getElementById('date');
  var prediction_base = {}
  prediction_base.Date = select_date.value;
  prediction_base.City = value_store
  prediction_base.Flavor = value_falvor
  await socket.emit("pre", prediction_base);
  //// send message 
  socket.on("prediction_res", (msg) => {
    console.log(msg)
    var pre = document.getElementById('pre');
    pre.innerHTML = `The model predicted <b>${msg.consumption} sales</b> of ${value_falvor} flavored ice-cream for the selected day, with confidence of ${msg.confidence}`;
  })
}