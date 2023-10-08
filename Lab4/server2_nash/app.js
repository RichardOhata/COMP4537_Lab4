const http = require('http');
const url = require('url');
const POST = "POST";
const GET = "GET";
const resource = "/api/definitions/";
const resourcePattern = "/api/definitions/?word=";
let pattern;
let dictionary = [];
let numberOfKeys;
let numberOfRequests = 0;

const server = http.createServer((req, res) => {
    res.writeHead(200, {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST",
        "Access-Control-Allow-Headers": "*"
    });

    const indexOfPatternSign = req.url.indexOf('=');
    if (indexOfPatternSign !== -1) {
        pattern = req.url.substring(0, indexOfPatternSign + 1);
    } else {
        pattern = "";
    }

    if (req.method === POST && req.url === resource) {
        numberOfRequests++;
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
                const existingIndex = dictionary.findIndex(item => item.word === jsonDataObj.word);
                if (existingIndex !== -1) {
                    // If the word exists, replace the existing entry
                    console.log("The word exists in the dictionary. It will be updated with new definition.");
                    dictionary[existingIndex] = jsonDataObj;
                } else {
                    dictionary.push(jsonDataObj);
                }
                numberOfKeys = Object.keys(dictionary).length;
                console.log("Request #" + numberOfRequests + " - Total number of entries in the dictionary: ", numberOfKeys);
                console.log("JSON: ", dictionary);
                res.end("Data received and saved.");
            } catch (error) {
                console.error("Request #" + numberOfRequests + "Error parsing JSON:" + error);
                res.writeHead(400, {
                    "Content-Type": "text/plain"
                });
                res.end("Invalid JSON data.");
            }
        });
    }

    if (req.method === GET && pattern === resourcePattern) {
        numberOfRequests++;
        const queryObject = url.parse(req.url, true).query;
        const word = queryObject.word;
        const foundData = dictionary.find(item => item.word === word);
        if (foundData) {
            console.log("Request #" + numberOfRequests + "- found in the dictionary.");
            res.end(foundData.definition);
        } else {
            console.log("Request #" + numberOfRequests + "- Word not found in the dictionary.");
            res.end("Word not found in the dictionary.");
        }
    } else if (req.method === "OPTIONS") {
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
    console.log(`Server is running...`);
});
