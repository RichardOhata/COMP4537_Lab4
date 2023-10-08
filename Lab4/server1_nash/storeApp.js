const POST = "POST";
const GET = "GET";

// Event listener for submit button in store.html
document.addEventListener("DOMContentLoaded", function () {
    const storeForm = document.getElementById("store");

    storeForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const word = document.getElementById("word").value;
        const definition = document.getElementById("definition").value;

        if (word.length !== 0 && definition.length !== 0) {
            document.getElementById("feedback").innerHTML = "";
            const data = JSON.stringify({
                word: word,
                definition: definition
            });
            post(data);
        } else {
            document.getElementById("feedback").innerHTML =
                "Please fill out both the word and definition fields.";
        }
    });
});

function post(data) {
    const xhttp = new XMLHttpRequest();
    const endPointRoot = "http://localhost:8888/api/";
    const resource = "definitions/";

    xhttp.open(POST, endPointRoot + resource, true);
    xhttp.setRequestHeader("Content-type", "application/json");

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4) {
            if (this.status == 200) {
                document.getElementById("feedback").innerHTML =
                    "Successfully stored the word and definition.";
            } else {
                document.getElementById("feedback").innerHTML =
                    "Error: Failed to store the word and definition.";
            }
        }
    };

    xhttp.send(data);
    console.log(data);
}

function get(data) {
    const xhttp = new XMLHttpRequest();
    const endPointRoot = "http://localhost:8888/api/";
    const word = { word: inputJSON.word }
    let resource = "definitions/?word=" + word;
    console.log("Get requested: ", resource);

    xhttp.open(GET, endPointRoot + resource, true);
    xhttp.setRequestHeader("Content-type", "application/json");

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4) {
            if (this.status == 200) {
                document.getElementById("feedback").innerHTML =
                    "Successfully stored the word and definition.";
            } else {
                document.getElementById("feedback").innerHTML =
                    "Error: Failed to store the word and definition.";
            }
        }
    };
    xhttp.send(data);
    console.log(data);
}