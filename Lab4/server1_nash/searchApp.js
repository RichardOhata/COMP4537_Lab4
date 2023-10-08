const GET = "GET";

// Event listener for search button in search.html
document.addEventListener("DOMContentLoaded", function () {
    const searchForm = document.getElementById("search");

    searchForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const word = document.getElementById("searchTerm").value;

        if (word.length !== 0) {
            document.getElementById("feedback").innerHTML = "";
            const data = JSON.stringify({
                word: word,
            });
            get(data);
        } else {
            document.getElementById("feedback").innerHTML =
                "Please fill out the word for search.";
        }
    });
});

function get(data) {
    const xhttp = new XMLHttpRequest();
    // const endPointRoot = "http://localhost:8888/api/";
    const endPointRoot = "https://port-0-nash4537lab4-12fhqa2blngyj6u4.sel5.cloudtype.app/api/";
    const parsedWord = JSON.parse(data);
    const word = parsedWord.word;
    let resource = "definitions/?word=" + word;

    xhttp.open(GET, endPointRoot + resource, true);
    xhttp.setRequestHeader("Content-type", "application/json");

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4) {
            if (this.status == 200) {
                const text = word + ": " + this.responseText;
                document.getElementById("feedback").innerHTML = text;
            } else if (this.status == 103) {
                document.getElementById("feedback").innerHTML =
                "Error: #103, Word not found in the dictionary";
            } else {
                document.getElementById("feedback").innerHTML =
                    "Error: Failed to retrieve the word's definition.";
            }
        }
    };
    xhttp.send(data);
    console.log(data);
}