const express = require('express');
var moment = require('moment');

var bodyParser = require('body-parser');
// create application/json parser (POST 傳送 JOSN 資料過來的bodyParser)
var jsonParser = bodyParser.json()
// create application/x-www-form-urlencoded parser  (POST 傳送 client表單 資料過來的bodyParser)
var urlencodedParser = bodyParser.urlencoded({ extended: false })

// MongoDB Client + dbo + ObjectId
var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectId;

// Constants
const PORT = 5500;
// const HOST = '192.168.0.14';

// App
const app = express();

// 提供靜態檔案顯示
app.use('/', express.static(__dirname + '/public'));

// mLab Mongodb tododatabase 連線 要有 { useNewUrlParser: true } 選項
let url = 'mongodb+srv://nintendof1:nintendoformula1@f1cluster-je0sc.gcp.mongodb.net/test?retryWrites=true&w=majority';
let dbo;
let drivers;
let databaseName = "F1";
let collecionName = 'Drivers';
MongoClient.connect(url, { useNewUrlParser: true },function(err, db) {
    if (err) console.log(err);
    else {
        dbo = db.db(databaseName);  // 指向 資料庫
        drivers = dbo.collection(collecionName); // 指向 Collection
        console.log('MongoDB 連線 F1...成功');
    }
    db.close();
});

// 127.0.0.1:5500/ root
app.get('/', (req, res) => {
    res.status(200).send('<h1> Node.js + Express.js </h1>\n\n<p>MongoDB CRUD</p>');
    // res.send('<h1> Node.js + Express.js </h1>\n\n<p>MongoDB CRUD</p>');
    // res.write("Hello world ,\n");
    // res.write("Node.js + Express.js\n");
    // res.end("Good bye");
});

// 查詢全部紀錄(GET)
app.get('/f1/drivers', (req, res) => {
    // http://localhost:5500/f1/drivers 
    // 取得全部 F1 Driver 紀錄
    MongoClient.connect(url, { useNewUrlParser: true },function(err, db) {
        if (err) console.log(err);
        else {
            dbo = db.db(databaseName);  // 指向 資料庫
            drivers = dbo.collection(collecionName); // 指向 Collection
            // console.log('MongoDB 連線 F1...成功');
            drivers.find({}).toArray((err, result) => {
                if (err) {
                    console.log(err);
                } else {
                    // console.log(result);
                    res.json(result);
                }
            })
        }
        db.close();
    });
})

// 根據 ID 查詢單筆紀錄(GET)
app.get('/f1/driver/:id',(req,res) =>{
    // http://localhost:5500/f1/driver/5d4e4a8494e1df05124b8111 
    // 取得全部 F1 Driver _id = 5d4e4a8494e1df05124b8111 的紀錄
    let myReq = req.params;
    let myID = myReq.id;
    let myQuery = {_id : ObjectId(myID)};
    // console.log('id : ' + myID);
    MongoClient.connect(url, { useNewUrlParser: true } , (err,db)=>{
        if (err) console.log(err);
        else {
            dbo = db.db(databaseName);  // 指向 資料庫
            drivers = dbo.collection(collecionName); // 指向 Collection
            drivers.find(myQuery).toArray((err, result) => {
                if (err) {
                    console.log(err);
                } else {
                    // console.log(result);
                    res.json(result);
                }
            })
        }
        db.close();
    })
})

// 新增一筆紀錄(POST)
app.post('/f1/drivers',jsonParser,(req,res)=>{
    // http://localhost:5500/f1/drivers/
    if (!req.body) {
        res.statusCode(400).send("<h1>資料不存在，無法新增</h1>");
    }else{
        let newvalues = req.body;
        newvalues.timestamp = moment().valueOf(); // 增加建檔時間欄位 timestamp
        // console.log('新增紀錄',newvalues);
        MongoClient.connect(url,{useNewUrlParser: true},(err,db)=>{
            if (err) console.log(err);
            else{
                dbo = db.db(databaseName);  // 指向 資料庫
                drivers = dbo.collection(collecionName); // 指向 Collection
                drivers.insertOne(newvalues,(err,result)=>{
                    if(err) {
                        console.log(err);
                    }else{
                        res.json(result.ops);
                    }
                })
            }
            db.close();
        })
    }
})

// 修改一筆紀錄(PUT)
app.put('/f1/drivers/:id',jsonParser,(req,res)=>{
    // http://localhost:5500/f1/drivers/
    // 取得全部 F1 Driver _id = 5d4e4a8494e1df05124b8111 的紀錄，並予以寫回新資料
    let myReq = req.params;
    let myID = myReq.id;
    let myQuery = {_id : ObjectId(myID)};
    if (!req.body) {
        res.statusCode(400).send("<h1>資料不存在，無法修改</h1>");
    }else {
        let newvalues = req.body;
        // console.log('修改紀錄',newvalues);
        MongoClient.connect(url,{useNewUrlParser:true},(err,db)=>{
            dbo = db.db(databaseName);  // 指向 資料庫
            drivers = dbo.collection(collecionName); // 指向 Collection
            drivers.updateOne(myQuery,{$set:newvalues},(err,result) =>{
                if (err){
                    console.log(err);
                }else {
                    res.json(result.result);
                }
            })
            db.close();
        })
    }
})

// 刪除一筆紀錄(DELETE)
app.delete('/f1/drivers/:id',jsonParser,(req,res)=>{
    // http://localhost:5500/f1/drivers/
    // 取得全部 F1 Driver _id = 5d4e4a8494e1df05124b8111 的紀錄，並予以刪除
    let myReq = req.params;
    let myID = myReq.id;
    let myQuery = {_id : ObjectId(myID)};
    MongoClient.connect(url, { useNewUrlParser: true } , (err,db)=>{
        if (err) console.log(err);
        else {
            dbo = db.db(databaseName);  // 指向 資料庫
            drivers = dbo.collection(collecionName); // 指向 Collection
            drivers.deleteOne(myQuery,(err,result)=>{
                res.json(result.result);
            })
        }
        db.close();
    })
})

app.listen(PORT,()=>{
    console.log(`Running on http://localhost:${PORT}`);
});
