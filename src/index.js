/**
 * This is the boilerplate repository for creating joules.
 * Forking this repository should be the starting point when creating a joule.
 */

/*
 * The handler function for all API endpoints.
 * The `event` argument contains all input values.
 *    event.httpMethod, The HTTP method (GET, POST, PUT, etc)
 *    event.{pathParam}, Path parameters as defined in your .joule.yml
 *    event.{queryStringParam}, Query string parameters as defined in your .joule.yml
 */
var Response = require('joule-node-response');
var Users = require('./users');

exports.handler = function(event, context) {
  var response = new Response()
      , users = new Users()
      , lastAccessedKey = 'lastAccessed'
      , component = event.path[0] || null;

  response.setContext(context);
  response.setHeader('Content-Type', 'application/json');

  if(!component) {
    return;
  }

  switch(component) {
    case 'users':
      if(event.httpMethod === 'GET') {
        if(typeof(event.path[1]) !== 'undefined') {
          users.get(event.path[1])
            .done(function(data) {
              if(data === null) {
                response.setHttpStatusCode(404);
                response.send(null);
              } else {
                response.send(data);
              }
            });
        } else {
          response.setHttpStatusCode(400);
          response.send('cannot get all users');
        }
        return;
      } else if(event.httpMethod === 'POST') {
        response.setHttpStatusCode(201);
        users.post(event.post['email'], event.post['username'])
          .done(function(data) {
            response.send(data);
          });
        return;
      } else if(event.httpMethod === 'PUT') {
        if(typeof(event.path[1]) === 'undefined' || !event.path[1]) {
          response.setHttpStatusCode(404);
          response.send('User not found');
        } else {
          users.post(event.path[1], event.post['username'])
            .done(function(data) {
              response.send(data);
            });
        }
        return;
      } else {
        response.setHttpStatusCode(400);
        response.send({message: 'unknown api', event: event});
        return;
      }
      break;
    default:
      response.setHttpStatusCode(400);
      response.send({message: '('+component+') is not a valid component.'});
      return;
  }
};
