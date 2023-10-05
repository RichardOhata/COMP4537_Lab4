const xhttp = new XMLHttpRequest();
const endPointRoot = "http://localhost:8888/API/definitions/"

document.addEventListener("DOMContentLoaded", function() {
    const submitForm = document.getElementById("submit_form");
    submitForm.addEventListener("submit", function(event) {
        event.preventDefault();
        post();

    })
});

function post() {
    const word = document.getElementById("word_input").value;
    const definition = document.getElementById("definition_input").value;
    const dictionary_entry = {
        word: word,
        definition: definition,
    }
 
    xhttp.open("POST", endPointRoot, true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(JSON.stringify(dictionary_entry));
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("test").innerText = xhttp.responseText;
        } 
}


};