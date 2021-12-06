const buttonElement = document.querySelector("button");
const inputElement = document.querySelector("input");
const ulElement = document.querySelector("ul");

buttonElement.addEventListener("click", handleClick);

async function handleClick() {
    const searchTerm = inputElement.value;
    const response = await fetch("/vino-italiano/search?term=" + searchTerm);
    const data = await response.json();

    const list = data.results.map(wine => {
        return `<li>
                    <a href="/vino-italiano/${wine._id}">
                        ${wine.varietal}
                    </a>
                </li>`
    }).join("");

    ulElement.innerHTML = list;

};