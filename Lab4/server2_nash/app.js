const http = require('http');
const POST = "POST";
const GET = "GET";
const resource = "/api/definitions/";
const resourcePattern = "/api/definitions/?word=";
let pattern;
let jsonData = [];

const server = http.createServer((req, res) => {
    res.writeHead(200, {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST",
        "Access-Control-Allow-Headers": "*"
    });

    console.log("Server received a request.");
    console.log("method:" + req.method);
    console.log("req.url:" + req.url);

    const indexOfPatternSign = req.url.indexOf('=');
    if (indexOfPatternSign !== -1) {
        pattern = req.url.substring(0, indexOfPatternSign + 1);
    } else {
        pattern = "";
    }

    if (req.method === POST && req.url === resource) {
        console.log("post requested");
        let body = "";
        req.on('data', function (chunk) {
            if (chunk != null) {
                body += chunk;
            }
        });
        req.on('end', function () {
            try {
                const jsonDataObj = JSON.parse(body);
                jsonData.push(jsonDataObj);
                console.log("Received JSON:", jsonDataObj);
                console.log("JSON: ", jsonData);
                res.end("Data received and saved.");
            } catch (error) {
                console.error("Error parsing JSON:", error);
                res.writeHead(400, {
                    "Content-Type": "text/plain"
                });
                res.end("Invalid JSON data.");
            }
        });

    } else if (req.method === GET && pattern === resourcePattern) {
        console.log("get requested");
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