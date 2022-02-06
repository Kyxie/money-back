## BACKEND

### Framework

Nodejs + Express + MongoDB

### Software

First install Nodejs and MongoDB, then use package management tool npm to install express.

```shell
$ npm install express --save
```

Robo3T is recommended.

Chrome is recommended.

### Files

bin/www: generated automantically, line 15 means, the default port is 8080.

common/util.js: commonly used functions.

config/DBHelper.js: used to connect the dataset (MongoDB).

controller/Main.js: main page's controller.

model/index.js: data structures.

routers/index.js: routers.

### How to run

```shell
$ npm install
$ npm start
```

