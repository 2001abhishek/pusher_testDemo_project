const Pusher = require("pusher");

const pusher = new Pusher({
  appId: "1914146",
  key: "4a3cd9acdccac3af6870",
  secret: "998867451e00d3c53190",
  cluster: "ap2",
  useTLS: true,
});

module.exports = pusher;
