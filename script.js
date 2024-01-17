const body = document.body;

//! DROPDOWN --------------------------------
const select = document.querySelector(".select");
const dropDownMenu = document.querySelector(".dropdown");
const dropDownItems = document.querySelectorAll(".drop");

select.addEventListener("click", () => {
	select.classList.toggle("active");
	dropDownMenu.classList.toggle("active");
});

//! API --------------------------------

const cardContainer = document.querySelector(".cards-container");
// let data;

// async function initialCard() {
// 	const fetched = await fetch("data.json");
// 	const data = await fetched.json();
// 	console.log(data);

// 	data.forEach((eachData) => {
// 		const newDiv = document.createElement("div");
// 		newDiv.classList.add("card");
// 	});
// }

// initialCard();

//* REGION

async function getRegion(url) {
	const link = await fetch(url);
	data = await link.json();
	console.log(data);

	data.forEach((eachData) => {
		const newCard = document.createElement("div");
		newCard.classList.add("card", "theme-changeable");
		newCard.innerHTML = `		           
						<img class="card-flag" src="${eachData.flags.png}" alt="${eachData.flags.alt}" />
						<div class="card-info">
							<h2 class="card-name text">${eachData.name.common}</h2>
							<div class="card-group">
								<div class="card-item">
									<h3 class="data populatoin text">Population:</h3>
									<p class="text">${eachData.population}</p>
								</div>
								<div class="card-item">
									<h3 class="data region text">Region:</h3>
									<p class="text">${eachData.region}</p>
								</div>
								<div class="card-item">
									<h3 class="data capital text">Capital:</h3>
									<p class="text">${eachData.capital[0]}</p>
								</div>
							</div>
						</div>
					
		`;
		cardContainer.append(newCard);

		//! dark mode for new cards -----------------
		// checkTheme();
	});
}

dropDownMenu.addEventListener("click", (event) => {
	cardContainer.innerHTML = "";
	const target = event.target.id;

	const url = `https://restcountries.com/v3.1/region/${target}`;
	getRegion(url);
});

//! Dark Mode --------------------------------

const darkMode = document.querySelector(".dark-mode");

let isLight = true;
let currentTheme = "light";

function checkTheme() {
	if (currentTheme === "dark") {
		darkTheme();
	} else if (currentTheme === "light") {
		lightTheme();
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
