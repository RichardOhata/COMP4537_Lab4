const http = require('http');
const url = require('url');
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
                // checking the word existing
                const existingIndex = jsonData.findIndex(item => item.word === jsonDataObj.word);
                if (existingIndex !== -1) {
                    // If the word exists, replace the existing entry
                    console.log("The word exists in the dictionary. It will be updated with new definition.");
                    jsonData[existingIndex] = jsonDataObj;
                } else {
                    jsonData.push(jsonDataObj);
                }
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
    } 

    if (req.method === GET && pattern === resourcePattern) {
        console.log("get requested");
        const queryObject = url.parse(req.url, true).query;
        const word = queryObject.word;
        const foundData = jsonData.find(item => item.word === word);
        // console.log("Found", foundData.definition);

        if (foundData) {
            // res.writeHead(200, {
            //     "Content-Type": "text/plain"
            // });
            console.log("founddata 200");
            res.end(foundData.definition);
        } else {
            // res.writeHead(404, {
            //     "Content-Type": "text/plain"
            // });
            console.log("not found data 404");
            res.end("Word not found in the dictionary.");
        }
    } else if (req.method === "OPTIONS") {
        console.log("options method");
        res.end();
    }
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