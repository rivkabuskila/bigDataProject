var redis = require('redis');
const redisClient = redis.createClient({
  host: 'localhost',
  port: '6379',
  password: 'eYVX7EwVmmxKPCDmwMtyKVge8oLd2t81'
  });
  redisClient.on('connect', function () {
    console.log('Sender connected to Redis');
});


redisClient.connect()


  module.exports={
    redisClient
}
