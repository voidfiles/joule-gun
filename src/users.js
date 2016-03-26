var JouleNodeDatabase = require('joule-node-database');

module.exports = function() {
  var db = new JouleNodeDatabase();

  this.post = function(email, username) {
    return db.set(email, {email: email, username: username, lastModified: (new Date()).toString()});
  };

  this.put = function(email, username) {
    return this.post(email, username);
  }

  this.get = function(email) {
    return db.get(email);
  };
};
