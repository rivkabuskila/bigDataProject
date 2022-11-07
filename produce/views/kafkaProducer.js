// https://www.cloudkarafka.com/ הפעלת קפקא במסגרת ספק זה

//*********************//
//   Create & Send    //
//*******************//
const create = require('../models/logic.js');
var Kafka = require('node-rdkafka');


let sale = ""
let cities = create.cities()
let holidays = create.holidays()
setTimeout(send, 1000)

function send() {

    const prefix = "zwfewzi4-";
    const topic = `${prefix}try`;

    var producer = new Kafka.Producer({
        "group.id": "kafka",
        "metadata.broker.list": "dory-01.srvs.cloudkafka.com:9094,dory-02.srvs.cloudkafka.com:9094,dory-03.srvs.cloudkafka.com:9094".split(","),
        "socket.keepalive.enable": true,
        "security.protocol": "SASL_SSL",
        "sasl.mechanisms": "SCRAM-SHA-256",
        "sasl.username": "zwfewzi4",
        "sasl.password": "wQ-7Y1FaWQFDjts-v0JKdTfvONgzA8Vf",
        "debug": "generic,broker,security"
    });

    var genMessage = Buffer.from("");

    producer.on("ready", function (arg) {

        // console.log('send sale to kafka ..');

        sale = create.sale(cities, holidays)
        console.log(sale)
        genMessage = Buffer.from(sale);

        producer.produce(topic, -1, genMessage);
        setTimeout(() => producer.disconnect(), 0);
    })

    myLoop()

    var i = 0;
    function ready() {
        i++
        if (i < 50) myLoop();
        producer.connect()
    }

    function myLoop() {
        setTimeout(ready, 2000)
    }


    producer.on('event.error', function (err) {
        console.log("event.error")
        console.error(err);
        process.exit(1);
    });
}