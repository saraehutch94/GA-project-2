// select button element and save to variable
const buttonElement = document.querySelector("button");
// select input area element and save to variable
const inputElement = document.querySelector("input");
// select div for search results and save to variable
const divElement = document.getElementById("search-results");

// add event listener to button element
buttonElement.addEventListener("click", handleClick);

// add event listener to input area element
inputElement.addEventListener("focus", handleReset);

async function handleClick() {
    // grab value entered into input area
    const searchTerm = inputElement.value;
    // if there is not a value entered in the input area, return an alert to enter a search term
    if (!searchTerm) return divElement.innerHTML = "<div style='color: red;'>Please enter a search term</div>"
    // grab response of search using fetch method and path with searchTerm as query search parameter
    const response = await fetch("/vino-italiano/search?term=" + searchTerm);
    // grab data from response to search query
    const data = await response.json();

    // if there is no data from response
    if(data.results.length === 0) {
        // return error to guest
        divElement.innerHTML = `<div style="color: red;">No Search Results</div>`
    // if there is data in the response
    } else {
        // use map method on the results in the data to grab the searched-for wine
        const list = data.results.map(wine => {
            // send found wine to guest with link back to it's show route
            return `<span class="uppercase-word flex-search-results">
                        <div class="flex-search-item"><a class="search-list-link" href="/vino-italiano/${wine._id}">
                            ${wine.varietal}
                        </a></div>
                    </span>`
        // take results and concatentate into a new string
        }).join("");
        
        // render the searched-for wine in the selected div element
        divElement.innerHTML = list;
    }
    // clear input area after search is complete
    inputElement.value = "";
}

// when user re-clicks on input area for new search, clear out previous search results
function handleReset() {
    divElement.innerHTML = "";
};