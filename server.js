const http = require('http');
const fs = require('fs');
const url = require('url');

let server = http.createServer((req, res)=>{
	let {pathname, query} = url.parse(req.url, true);
	if(pathname == '/api/getData'){
		let obj = {
			data: 'datas',
			code: 0
		};
		res.end(JSON.stringify(obj));
	}else{
		 res.end(`url is ${req.url}`);
	}
}).listen('9002',function (){
     console.log('9002 start work');
});
