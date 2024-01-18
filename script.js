const body = document.body;

//! DROPDOWN ====================================================================================

const select = document.querySelector(".select");
const dropDownMenu = document.querySelector(".dropdown");
const dropDownItems = document.querySelectorAll(".drop");

select.addEventListener("click", () => {
	select.classList.toggle("active");
	dropDownMenu.classList.toggle("active");
});

//! API ====================================================================================

const cardContainer = document.querySelector(".cards-container");

//? REGION -----------------------------

function cardCreator(eachCard) {
	const newCard = document.createElement("div");
	newCard.classList.add("card", "theme-changeable");
	newCard.innerHTML = `		           
						<img class="card-flag" src="${eachCard.flags.png}" alt="${eachCard.flags.alt}" />
						<div class="card-info">
							<h2 class="card-name text">${eachCard.name.common}</h2>
							<div class="card-group">
								<div class="card-item">
									<h3 class="data populatoin text">Population:</h3>
									<p class="text">${eachCard.population.toLocaleString()}</p>
								</div>
								<div class="card-item">
									<h3 class="data region text">Region:</h3>
									<p class="text">${eachCard.region}</p>
								</div>
								<div class="card-item">
									<h3 class="data capital text">Capital:</h3>
									<p class="text">${eachCard.capital[0]}</p>
								</div>
							</div>
						</div>	
		`;
	cardContainer.append(newCard);

	// //* dark mode for new cards -----------------

	const allNewText = document.querySelectorAll(".text");
	const allNewElement = document.querySelectorAll(".theme-changeable");
	checkTheme(allNewText, allNewElement);
}

async function getRegion(url) {
	const link = await fetch(url);
	data = await link.json();

	data.forEach((eachData) => {
		console.log(eachData);
		cardCreator(eachData);
	});
}

dropDownMenu.addEventListener("click", (event) => {
	cardContainer.innerHTML = "";
	const target = event.target.id;

	const url = `https://restcountries.com/v3.1/region/${target}`;
	getRegion(url);
});

//? SEARCH -----------------------------

const searchInput = document.querySelector(".search-input");
const searchIcon = document.querySelector(".search-icon");

async function getName() {
	if (searchInput.value === "") {
		searchInput.placeholder = "Please enter a country name";
		searchInput.classList.add("active");
	} else {
		cardContainer.innerHTML = "";
		searchName();
	}
}

async function searchName() {
	const link = await fetch(`https://restcountries.com/v3.1/name/${searchInput.value}?fullText=true`);
	const data = await link.json();
	const country = await data[0];
	console.log(country);
	cardCreator(country);
}

searchIcon.addEventListener("click", getName);

//! Dark Mode ====================================================================================

const darkMode = document.querySelector(".dark-mode");

let isLight = true;
let currentTheme = "light";

function checkTheme(allNewText, allNewElement) {
	if (currentTheme === "dark") {
		allNewText.forEach((eachText) => {
			eachText.style.color = "white";
		});
		allNewElement.forEach((eachElement) => {
			eachElement.style.backgroundColor = "hsl(209, 23%, 22%)";
		});
		body.style.backgroundColor = "hsl(207, 26%, 17%)";
	}
}

function changeTheme() {
	const allText = document.querySelectorAll(".text");
	const allElement = document.querySelectorAll(".theme-changeable");

	if (isLight) {
		isLight = false;
		currentTheme = "dark";
		darkTheme(allText, allElement);
	} else {
		isLight = true;
		currentTheme = "light";
		lightTheme(allText, allElement);
	}
}

function darkTheme(texts, backgrounds) {
	texts.forEach((eachText) => {
		eachText.style.color = "white";
	});
	backgrounds.forEach((eachElement) => {
		eachElement.style.backgroundColor = "hsl(209, 23%, 22%)";
	});
	body.style.backgroundColor = "hsl(207, 26%, 17%)";
}

function lightTheme(texts, backgrounds) {
	texts.forEach((eachText) => {
		eachText.style.color = "black";
	});
	backgrounds.forEach((eachElement) => {
		eachElement.style.backgroundColor = "white";
	});
	body.style.backgroundColor = "hsl(0, 0%, 98%)";
}

darkMode.addEventListener("click", changeTheme);
