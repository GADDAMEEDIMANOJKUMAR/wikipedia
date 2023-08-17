let searchInputEl = document.getElementById("searchInput");
let searchResultsEl = document.getElementById("searchResults");
let spinnerEl = document.getElementById("spinner");

function wikipedia(results) {
    let {
        title,
        link,
        description
    } = results;

    let resultEl = document.createElement("div");
    resultEl.classList.add("result-item");
    searchResultsEl.appendChild(resultEl);

    let titleEl = document.createElement("a");
    titleEl.href = link;
    titleEl.target = "_blank";
    titleEl.textContent = title;
    titleEl.classList.add("result-title");
    resultEl.appendChild(titleEl);

    let breakEl = document.createElement("br");
    resultEl.appendChild(breakEl);

    let anchorEl = document.createElement("a");
    anchorEl.href = link;
    anchorEl.target = "_blank";
    anchorEl.textContent = link;
    anchorEl.classList.add("result-url");
    resultEl.appendChild(anchorEl);

    let linebreakEl = document.createElement("br");
    resultEl.appendChild(linebreakEl);

    let textContent = document.createElement("p");
    textContent.textContent = description;
    textContent.classList.add("line-description");
    resultEl.appendChild(textContent);

}

function displayResults(search_results) {
    spinnerEl.classList.toggle("d-none");
    for (let results of search_results) {
        wikipedia(results);

    }
}

searchInputEl.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        spinnerEl.classList.toggle("d-none");
        searchResultsEl.textContent = "";
        let inputValue = searchInputEl.value;
        let url = "https://apis.ccbp.in/wiki-search?search=" + inputValue;
        let options = {
            method: "GET"
        };
        fetch(url, options)
            .then(function(response) {
                return response.json();
            })
            .then(function(jsonData) {
                let {
                    search_results
                } = jsonData;
                displayResults(search_results);
            });

    }
});