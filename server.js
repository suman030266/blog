const express = require('express'),
    expressStatic = require('express-static'),
    bodyParser = require('body-parser'),
    fs = require('fs');
let port = 9002,
    app = express();

// 解析body数据
app.use(bodyParser.urlencoded({
    extended: true
}));

//设置静态文件地址
app.use(expressStatic(`${__dirname}/www`));

app.all(`*`, (req, res)=>{
    res.send(`sorry, 您访问的资源不存在`);
});

app.listen(port, ()=>{
    console.log(`server is startd at ${port}`);
});

