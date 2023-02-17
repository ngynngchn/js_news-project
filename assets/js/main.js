document.querySelector("#country").addEventListener("change", changeCountry);
// document.querySelector("#category").addEventListener("change", changeCategory);
document.querySelector("#keywords").addEventListener("input", searchKeywords);

let countryCode = "de";
let category = "";
let keywords = "";

function changeCountry(event) {
	document.querySelector("main").innerHTML = "";
	countryCode = event.target.value;
	getNews();
}

document.querySelectorAll("button:not(.btn)").forEach((category) => {
	category.addEventListener("click", changeCategory);
});

function changeCategory(event) {
	category = event.target.value;
	document.querySelector("main").innerHTML = "";
	getNews();
}
function searchKeywords(event) {
	keywords = event.target.value;
	document.querySelector("main").innerHTML = "";
	getNews();
	document.querySelector("#keywords").innerHTML = "";
}

function getNews() {
	console.log("I'm here!");
	fetch(
		`https://newsapi.org/v2/top-headlines?q=${keywords}&country=${countryCode}&category=${category}&apiKey=db54a69425aa419ba1f3a9bb16414a18`
	)
		.then((response) => response.json())
		.then((news) => {
			news.articles.forEach((data) => {
				// * save information in variables for later use
				const { title, description, url, urlToImage, publishedAt } = data;

				// * create Elements to add to HTML
				const card = document.createElement("section");
				const article = document.createElement("article");
				const img = document.createElement("img");
				const header = document.createElement("h2");
				const p = document.createElement("p");
				const day = document.createElement("span");
				const link = document.createElement("a");

				img.src = urlToImage;
				img.alt = "News-Image";
				header.textContent = title;
				p.textContent = description;
				day.textContent = publishedAt.slice(0, 10);
				link.textContent = "MEHR LESEN";
				link.href = url;

				article.appendChild(header);
				article.appendChild(p);
				card.appendChild(img);
				card.appendChild(article);
				card.appendChild(day);
				card.appendChild(link);
				// * append element to main
				document.querySelector("main").appendChild(card);
			});
		});
	document.querySelector(".btn").style.display = "block";
}

getNews();

// * scroll to top function
document.querySelector(".btn").addEventListener("click", () => {
	window.scrollTo(0, 0);
});
