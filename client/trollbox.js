Trollbox = new Mongo.Collection('trollbox')

Template.hello.onCreated(function() {
  this.subscribe('trollboxtest');
});

Template.hello.helpers({
  myHelper() {
    return Trollbox.find({});
  }
});
