document.querySelector("#country").addEventListener("change", changeCountry);
document.querySelector("#category").addEventListener("change", changeCategory);

let countryCode = "de";
let category = "";

function changeCountry(event) {
	document.querySelector("main").innerHTML = "";
	countryCode = event.target.value;
	getNews();
}

function changeCategory(event) {
	category = event.target.value;
	document.querySelector("main").innerHTML = "";
	getNews();
}

function getNews() {
	console.log("I'm here!");
	fetch(
		`https://newsapi.org/v2/top-headlines?country=${countryCode}&category=${category}&apiKey=e843ca4542f44d908e59b6d85446fcee`
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
	document.querySelector("button").style.display = "block";
}

getNews();

// * scroll to top function
document.querySelector("button").addEventListener("click", () => {
	window.scrollTo(0, 0);
});
