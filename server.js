const http = require('http');
const fs = require('fs');
const url = require('url');

let server = http.createServer((req, res)=>{
	let {pathname, query} = url.parse(req.url, true);
	if(pathname == '/' || pathname == '/index'){
		 res.end('hello 9001 blog');
	}else{
		 res.end('404 not found');
	}
}).listen('9001',function (){
     console.log('9001 start work');
});

