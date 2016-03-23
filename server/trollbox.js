import autobahn from 'autobahn';

Meteor.publish('trollboxtest', function() {
  const wsuri = "wss://api.poloniex.com";

  const connection = new autobahn.Connection({
    url: wsuri,
    realm: "realm1"
  });

  const trollboxEvent = (args, kwargs) => {
    const doc = {
      type: args[0],
      id: args[1],
      name: args[2],
      message: args[3]
    }
    this.added('trollbox', Random.id(), doc);
    this.ready();
  }

  connection.onopen = (session) => {
    session.subscribe('trollbox', trollboxEvent);
  }

  connection.onclose = (reason, details) => {
    console.log("Websocket connection closed:", reason);
  }

  connection.open();
});
