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
		 res.end('404 not found');
	}
}).listen('9001',function (){
     console.log('9001 start work');
});
