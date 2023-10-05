const http = require('http');
const url = require('url');
const endPointRoot = "https://localhost:8888/"
http.createServer(function (req, res) {
    res.writeHead(200, {
        "Content-Type": "text/html",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST",
        "Access-Control-Allow-Headers": "Content-Type",
    });
        console.log("Server received a request");
    if (req.method === 'POST' && req.url === "/API/definitions/") {
        console.log("here");
        let body = "";

        req.on('data', function(chunk) {
            if (chunk != null) {
                body += chunk;
            }
        });

        req.on('end', function () {
            const dictionary_entry = JSON.parse(body);
            console.log(dictionary_entry.word);
            console.log(dictionary_entry.definition);
            // let q = url.parse(body, true);
            res.end(dictionary_entry.word);

            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Data received successfully' }));
        });
    }
    
        res.end();
}).listen(8888);