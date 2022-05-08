##   Data Model
![Data Model](./model/diagrame.png)

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```
## Configuration
```ts
Neo4jModule.forRoot(
    {
      scheme:"the data base shceme need to be on of 'neo4j' | 'neo4j+s' | 'neo4j+scc' | 'bolt' | 'bolt+s' | 'bolt+scc';",
      host:'the host of the data base example localhost',
      port:"the port to connect the databasecan be string or a int ",
      username:'username',
      password:'password'
    }
  )
 ```
## Structure
```
├── model
├── nest-cli.json
├── package.json
├── package-lock.json
├── README.md
├── src
│   ├── app.controller.spec.ts
│   ├── app.controller.ts
│   ├── app.module.ts
│   ├── app.service.ts
│   ├── connector                       // connector module folder
│   │   ├── connector.controller.spec.ts    // connector controller test file
│   │   ├── connector.controller.ts         // connector controller 
│   │   ├── connector.module.ts             // connector module 
│   │   ├── connector.service.spec.ts       // connector service test file
│   │   └── connector.service.ts            // connector service 
│   ├── dto                             // object deserilaizers
|   |   ├── connectorCreate.dto.ts          // dto for creating connector
|   |   ├── connectorUpdate.dto.ts          // dto for updating connector
|   |   ├── endPointCreate.dto.ts           // dto for creating end-point
|   |   ├── endPointUpdate.dto.ts           // dto for updating end-point
|   |   ├── markerCreate.dto.ts             // dto for creating marker
|   |   ├── markerUpdate.dto.ts             // dto for updating marker
|   |   └── searshPath.dto.ts               // dto for query searching path from marker to end-point
│   ├── end-point                       // end-point module folder
|   |   ├── end-point.controller.spec.ts    // end-point controller test 
|   |   ├── end-point.controller.ts         // end-point controller 
|   |   ├── end-point.module.ts             // end-point module 
|   |   ├── end-point.service.spec.ts       // end-point service test 
|   |   └── end-point.service.ts            // end-point service 
│   ├── entity                          // entity folder
|   |   ├── connector.entity.ts             //  connector entity
|   |   ├── endPoint.entity.ts              //  end-point entity
|   |   └── marker.entity.ts                //  marker entity
│   ├── main.ts
│   └── marker                         // marker module folder
|   |   ├── marker.controller.spec.ts       // marker controller test
|   |   ├── marker.controller.ts            // marker controller 
|   |   ├── marker.module.ts                // marker module 
|   |   ├── marker.service.spec.ts          // marker service test
|   |   └── marker.service.ts               // marker service 
├── test // contain e2e tests for the api
├── tsconfig.build.json
└── tsconfig.json
```
## Api
we have 3 type of node in the data base:
* markers:the marker represent where the qr code will be placed in the building 
* connectors:connector represent the nodes that will form a path to the end point
* end points: represent stratigic places that the user want to visit in the building (conference room,lab..)

### Marker

#### Request
 ***HTTP GET  `/marker`*** 
 ```
 curl -i -H 'Accept: application/json' http://localhost:3000/marker/

 ```
 #### Responce
```
HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 280
ETag: W/"118-SlLlya2udmO06WaTm+cx8eRjFS8"
Date: Sun, 08 May 2022 06:04:46 GMT
Connection: keep-alive
Keep-Alive: timeout=5

{
    "markers": [
        {
            "id": string,
            "Longitude": number,
            "longitude": number
        }
        ...
    ]
}
```
#### Request
 ***HTTP POST  `/marker`*** 

```
curl -d '{"marker":{"longitude": longitude value,"latitude": latitude value}}' -H "Content-Type: application/json" -X POST https://localhost:3000/marker

```
response:
```
HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 280
ETag: W/"118-SlLlya2udmO06WaTm+cx8eRjFS8"
Date: Sun, 08 May 2022 06:04:46 GMT
Connection: keep-alive
Keep-Alive: timeout=5
{
    "marker": {
        "id": "unique id(uuid)",
        "latitude": longitude value,
        "longitude": latitude value
    }
}
```
#### Request
 ***HTTP GET  `/marker/:id`*** 
 ```
curl -i -H "Content-Type: application/json" https://localhost:3000/marker/markerID

```
response:
```
HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 280
ETag: W/"118-SlLlya2udmO06WaTm+cx8eRjFS8"
Date: Sun, 08 May 2022 06:04:46 GMT
Connection: keep-alive
Keep-Alive: timeout=5
{
    "marker": {
        "id": "markerID",
        "latitude":  longitude value,
        "longitude": latitude value
    }
}
```
#### Request
 ***HTTP PUT  `/marker/:id`*** 
 ```
curl -d '{"marker":{"longitude": new longitude value,"latitude": new latitude value}}' -H "Content-Type: application/json" -X PUT https://localhost:3000/marker/id

```
response:
```
HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 280
ETag: W/"118-SlLlya2udmO06WaTm+cx8eRjFS8"
Date: Sun, 08 May 2022 06:04:46 GMT
Connection: keep-alive
Keep-Alive: timeout=5
{
    "marker": {
        "id": "unique id(uuid)",
        "latitude": new longitude value,
        "longitude":new latitude value
    }
}
```
#### Request
 ***HTTP DELETE  `/marker/:id`*** 
 ```
curl -X -H "Content-Type: application/json"  DELETE https://localhost:3000/marker/id

```
response:
```
HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 280
ETag: W/"118-SlLlya2udmO06WaTm+cx8eRjFS8"
Date: Sun, 08 May 2022 06:04:46 GMT
Connection: keep-alive
Keep-Alive: timeout=5
{ "OK" }
```
#### Request
 ***HTTP POST  `/marker/Path`*** 
 ```
curl -d '{"query":{"markerID": "marker id","endPointID": "end point id"}}' -H "Content-Type: application/json" -X POST https://localhost:3000/marker/Path

```
response:
```
HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 280
ETag: W/"118-SlLlya2udmO06WaTm+cx8eRjFS8"
Date: Sun, 08 May 2022 06:04:46 GMT
Connection: keep-alive
Keep-Alive: timeout=5
{ {
    "path": [
        {
            "id": "markerID",
            "latitude": ,
            "longitude": 
        },
        {
            "id": "",
            "latitude": ,
            "longitude": 
        }, 
        //more connector
        ...,
        //end Point
        {
            "name": "",
            "id": "endPointID",
            "latitude": ,
            "longitude": 
        }
    ]
}}
```

#### Request
 ***HTTP POST  `marker/:markerID/relation/:connectorID`*** 
 ```
curl -H "Content-Type: application/json" -X POST https://localhost:3000/marker/markerID/relation/connectorID

```
response:
```
HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 280
ETag: W/"118-SlLlya2udmO06WaTm+cx8eRjFS8"
Date: Sun, 08 May 2022 06:04:46 GMT
Connection: keep-alive
Keep-Alive: timeout=5
{ 
    "marker": 
        {
            "id": "markerID",
            "latitude": ,
            "longitude": 
        },
    
    
}
```
#### Request
 ***HTTP GET  `marker/endpoints/:id`*** 
 ```
curl -i -H "Content-Type: application/json" https://localhost:3000/marker/endpoints/markerIDd

```
response:
```
HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 280
ETag: W/"118-SlLlya2udmO06WaTm+cx8eRjFS8"
Date: Sun, 08 May 2022 06:04:46 GMT
Connection: keep-alive
Keep-Alive: timeout=5
{ 
    "endpoints": [
       
        {
            "name": "",
            "id": "",
            "latitude": ,
            "longitude": 
        },
        {
            "name": "",
            "id": "",
            "latitude": ,
            "longitude": 
        },....
    ]
}
```
### Connector
#### Request
 ***HTTP GET  `/connector`*** 
 ```
 curl -i -H 'Accept: application/json' http://localhost:3000/connector/

 ```
 #### Responce
```
HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 280
ETag: W/"118-SlLlya2udmO06WaTm+cx8eRjFS8"
Date: Sun, 08 May 2022 06:04:46 GMT
Connection: keep-alive
Keep-Alive: timeout=5

{
    "connectors": [
        {
            "id": string,
            "Longitude": number,
            "longitude": number
        }
        ...
    ]
}
```
#### Request
 ***HTTP POST  `/connecotr`*** 

```
curl -d '{"connecotr":{"longitude": longitude value,"latitude": latitude value}}' -H "Content-Type: application/json" -X POST https://localhost:3000/connecotr

```
response:
```
HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 280
ETag: W/"118-SlLlya2udmO06WaTm+cx8eRjFS8"
Date: Sun, 08 May 2022 06:04:46 GMT
Connection: keep-alive
Keep-Alive: timeout=5
{
    "connector": {
        "id": "unique id(uuid)",
        "latitude": longitude value,
        "longitude": latitude value
    }
}
```
#### Request
 ***HTTP PUT  `/connecotr/:id`*** 
 ```
curl -d '{"connecotr":{"longitude": new longitude value,"latitude": new latitude value}}' -H "Content-Type: application/json" -X PUT https://localhost:3000/connecotr/id

```
response:
```
HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 280
ETag: W/"118-SlLlya2udmO06WaTm+cx8eRjFS8"
Date: Sun, 08 May 2022 06:04:46 GMT
Connection: keep-alive
Keep-Alive: timeout=5
{
    "connecotr": {
        "id": "unique id(uuid)",
        "latitude": new longitude value,
        "longitude":new latitude value
    }
}
```
#### Request
 ***HTTP DELETE  `/connecotr/:id`*** 
 ```
curl -X -H "Content-Type: application/json"  DELETE https://localhost:3000/connecotr/id

```
response:
```
HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 280
ETag: W/"118-SlLlya2udmO06WaTm+cx8eRjFS8"
Date: Sun, 08 May 2022 06:04:46 GMT
Connection: keep-alive
Keep-Alive: timeout=5
{ "OK" }
```
#### Request
 ***HTTP POST  `/connecotr/hasPath/:connector1/:connector2`*** 

```
curl  -H "Content-Type: application/json" -X POST https://localhost:3000/connecotr/hasPath/connector1ID/connector2ID

```
response:
```
HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 280
ETag: W/"118-SlLlya2udmO06WaTm+cx8eRjFS8"
Date: Sun, 08 May 2022 06:04:46 GMT
Connection: keep-alive
Keep-Alive: timeout=5
{"OK"}
```
#### Request
 ***HTTP POST  `/connecotr/end/:connector/:endPoint`*** 

```
curl  -H "Content-Type: application/json" -X POST https://localhost:3000/connecotr/end/connectorID/endPointID

```
response:
```
HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 280
ETag: W/"118-SlLlya2udmO06WaTm+cx8eRjFS8"
Date: Sun, 08 May 2022 06:04:46 GMT
Connection: keep-alive
Keep-Alive: timeout=5
{"OK"}
```
### EndPoint
#### Request
 ***HTTP GET  `/end-point`*** 
 ```
 curl -i -H 'Accept: application/json' http://localhost:3000/end-point/

 ```
 #### Responce
```
HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 280
ETag: W/"118-SlLlya2udmO06WaTm+cx8eRjFS8"
Date: Sun, 08 May 2022 06:04:46 GMT
Connection: keep-alive
Keep-Alive: timeout=5

{
    "endPoints": [
        {
            "id": string,
            "name":string,
            "Longitude": number,
            "longitude": number
        }
        ...
    ]
}
```
#### Request
 ***HTTP POST  `/end-point`*** 

```
curl -d '{"endPoint":{"name":"name","longitude": longitude value,"latitude": latitude value}}' -H "Content-Type: application/json" -X POST https://localhost:3000/end-point

```
response:
```
HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 280
ETag: W/"118-SlLlya2udmO06WaTm+cx8eRjFS8"
Date: Sun, 08 May 2022 06:04:46 GMT
Connection: keep-alive
Keep-Alive: timeout=5
{
    "endPoint": {
        "id": "unique id(uuid)",
        "name":"name",
        "latitude": longitude value,
        "longitude": latitude value
    }
}
```
#### Request
 ***HTTP PUT  `/end-point/:id`*** 
 ```
curl -d '{"endPoint":{"name":"new name","longitude": new longitude value,"latitude": new latitude value}}' -H "Content-Type: application/json" -X PUT https://localhost:3000/end-point/id

```
response:
```
HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 280
ETag: W/"118-SlLlya2udmO06WaTm+cx8eRjFS8"
Date: Sun, 08 May 2022 06:04:46 GMT
Connection: keep-alive
Keep-Alive: timeout=5
{
    "endPoint": {
        "id": "unique id(uuid)",
        "name":"new name"
        "latitude": new longitude value,
        "longitude":new latitude value
    }
}
```
#### Request
 ***HTTP DELETE  `/end-point/:id`*** 
 ```
curl -X -H "Content-Type: application/json"  DELETE https://localhost:3000/end-point/id

```
response:
```
HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 280
ETag: W/"118-SlLlya2udmO06WaTm+cx8eRjFS8"
Date: Sun, 08 May 2022 06:04:46 GMT
Connection: keep-alive
Keep-Alive: timeout=5
{ "OK" }
```
## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```