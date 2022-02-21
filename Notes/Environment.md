### 框架

Nodejs + Express + MongoDB，先安装node和MongoDB，node自带包管理工具npm，再用npm安装express

```shell
$ npm install express --save
```

### 文件

bin/www：自动生成的文件，默认端口为8080 (line 15)

common/util.js：放一些常用函数

config/DBHelper.js：用于连接数据库（MongoDB）

config/index.js：数据库存放位置

controller/Main.js：主界面的controller

controller/Detail.js：/Detail的controller，以后再新建controller的时候统一命名为xxxController.js

model/index.js：数据存放格式

routers/index.js：每在controller里面新建一个controller都要在这新建一个变量

app.js：line28-29

### 格式

VSCode左下角setting，搜索format，在Text Editor的formatting中打开Format on Paste和Format on Save

### 运行

```shell
$ npm install
$ npm start
```

如果运行成功在浏览器上输入`locahost:8080`会出现

Main

welcome to main

在浏览器上输入`locahost:8080/Detail`会出现

{"data":{"username":"123","param":{}},"code":200}

### 数据库

[Nodejs Express 连接Mongodb - SegmentFault 思否](https://segmentfault.com/a/1190000008387379)

创建数据库：

```shell
start mongod --dbpath E:\MongoDB\data  
```

我们用的数据库是mongoDB，直接用命令行操作数据库：[MongoDB 教程 | 菜鸟教程 (runoob.com)](https://www.runoob.com/mongodb/mongodb-tutorial.html)

Robo3T：GUI显示数据库

在Nodejs中操作数据库的函数库是mongoose：[Mongoose v6.2.1: API docs (mongoosejs.com)](https://mongoosejs.com/docs/api.html)