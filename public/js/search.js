const buttonElement = document.querySelector("button");
const inputElement = document.querySelector("input");
const divElement = document.getElementById("search-results");

buttonElement.addEventListener("click", handleClick);
inputElement.addEventListener("focus", handleReset);

async function handleClick() {
    const searchTerm = inputElement.value;
    if (!searchTerm) return divElement.innerHTML = "<div style='color: red;'>Please enter a search term</div>"
    const response = await fetch("/vino-italiano/search?term=" + searchTerm);
    const data = await response.json();

    if(data.results.length === 0) {
        divElement.innerHTML = `<div style="color: red;">No Search Results</div>`
    } else {
        const list = data.results.map(wine => {
            return `<span class="uppercase-word flex-search-results">
                        <div class="flex-search-item"><a class="search-list-link" href="/vino-italiano/${wine._id}">
                            ${wine.varietal}
                        </a></div>
                    </span>`
        }).join("");
    
        divElement.innerHTML = list;
    }
    inputElement.value = "";
}

function handleReset() {
    divElement.innerHTML = "";
};