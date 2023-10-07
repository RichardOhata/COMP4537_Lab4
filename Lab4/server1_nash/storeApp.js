document.addEventListener("DOMContentLoaded", function () {
    const submitForm = document.querySelector("form");

    submitForm.addEventListener("submit", function (event) {
        event.preventDefault(); // 폼 기본 제출 동작 방지

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

    xhttp.open("POST", endPointRoot + resource, true);
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