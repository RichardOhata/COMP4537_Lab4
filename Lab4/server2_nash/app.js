const http = require('http');
const POST = "POST";
const GET = "GET";
const resource = "/API/definitions/";

const server = http.createServer((req, res) => {
    res.writeHead(200, {
        "Content-Type": "text/html",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "*"
    });
    console.log("Server received a request.");

    if (req.method === POST && req.url === resource) {
        console.log("post requested");
        
    }

    res.end();
});

const port = 8888;

server.on('error', (error) => {
    if (error.code) {
        console.error(`An error occurred:`, error.message);
    }
});

server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});