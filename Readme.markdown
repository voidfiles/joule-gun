# Basic Joule REST API 

[![Run on Joule](https://joule.run/static/images/run-on-joule.png)](https://joule.run/joule/create/joulehq/joule-basic-rest-api)

## Setting up your local environment

These commands will set up your local environment for easy testing.

```
git clone git@github.com:joulehq/joule-basic-rest-api.git
cd joule-basic-rest-api/src
cp events.json-sample events.json
npm install
npm test
```

## Get a user

Issue a GET call to retrieve a user by ID.

A user who exists.

```
curl -i -X GET \
  "https://api.joule.run/joulehq/joule-basic-rest-api/users/user@example.com"
HTTP/1.1 200 OK
Content-Type: application/json
Date: Fri, 25 Mar 2016 16:26:34 GMT
Server: Apache/2.4.7 (Ubuntu)
Status: 200 OK
Content-Length: 109
Connection: keep-alive

{"username": "user_example", "lastModified": "Thu Mar 17 2016 05:32:44 GMT+0000 (UTC)", "email": "user@example.com"}
```

A user who does not exist.

```
curl -i -X GET \
  "https://api.joule.run/joulehq/joule-basic-rest-api/users/does-not-exist@example.com"
HTTP/1.1 404 Not Found
Content-Type: application/json
Date: Fri, 25 Mar 2016 16:25:17 GMT
Server: Apache/2.4.7 (Ubuntu)
Status: 404 Not Found
Content-Length: 4
Connection: keep-alive

null
```

## Create a User

Create a new user.

```
curl -i -X POST \
  -H "Content-Type: application/json" \
  --data '{"username":"a-new-user"}' \
  "https://api.joule.run/joulehq/joule-basic-rest-api/users/a-new-user@example.com"
HTTP/1.1 201 Created
Content-Type: application/json
Date: Fri, 25 Mar 2016 16:32:14 GMT
Server: Apache/2.4.7 (Ubuntu)
Status: 201 Created
Content-Length: 85
Connection: keep-alive

{"username": "a-new-user", "lastModified": "Fri Mar 25 2016 16:30:42 GMT+0000 (UTC)"}
```

## Update a User

Update an existing user.

```
url -i -X PUT \
  -H "Content-Type: application/json" \
  --data '{"username":"a-new-user-updated"}' \
  "https://api.joule.run/joulehq/joule-basic-rest-api/users/a-new-user@example.com"
HTTP/1.1 200 OK
Content-Type: application/json
Date: Fri, 25 Mar 2016 16:35:45 GMT
Server: Apache/2.4.7 (Ubuntu)
Status: 200 OK
Content-Length: 128
Connection: keep-alive

{"username": "a-new-user-updated", "lastModified": "Fri Mar 25 2016 16:34:13 GMT+0000 (UTC)", "email": "a-new-user@example.com"}
```
