const buttonElement = document.querySelector("button");
const inputElement = document.querySelector("input");
const ulElement = document.querySelector("ul");

buttonElement.addEventListener("click", handleClick);
inputElement.addEventListener("focus", handleReset);

async function handleClick() {
    const searchTerm = inputElement.value;
    if (!searchTerm) return alert("Please enter a search term.");
    const response = await fetch("/vino-italiano/search?term=" + searchTerm);
    const data = await response.json();

    if(data.results.length === 0) {
        ulElement.innerHTML = `<li>No Search Results</li>`
    } else {
        const list = data.results.map(wine => {
            return `<li>
                        <a href="/vino-italiano/${wine._id}">
                            ${wine.varietal}
                        </a>
                    </li>`
        }).join("");
    
        ulElement.innerHTML = list;
    }
    inputElement.value = "";
}

function handleReset() {
    ulElement.innerHTML = "";
};