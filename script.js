const body = document.body;

//! DROPDOWN ========================================================

const select = document.querySelector(".select");
const dropDownMenu = document.querySelector(".dropdown");
const dropDownItems = document.querySelectorAll(".drop");

select.addEventListener("click", () => {
	select.classList.toggle("active");
	dropDownMenu.classList.toggle("active");
});

//! API =============================================================

const cardContainer = document.querySelector(".cards-container");

//? CARD MAKER -----------------------------

function cardCreator(eachCard) {
	const newCard = document.createElement("div");
	newCard.classList.add("card", "theme-changeable");
	addData(eachCard, newCard);
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
	newCard.addEventListener("click", previewCard(newCard));

	// //* dark mode for new cards -----------------

	const allNewText = document.querySelectorAll(".text");
	const allNewElement = document.querySelectorAll(".theme-changeable");
	checkTheme(allNewText, allNewElement);
}

// ? DATA ADDER -----------------------------

function addData(element, newCard) {
	let countryBorder = [];
	const bordersRef = element.borders ? Object.keys(element.borders) : "N / A";
	const languageRef = Object.keys(element.languages);
	const currencyRef = Object.keys(element.currencies);
	const countryCurrency = element.currencies[currencyRef[0]].name;
	const countryNativeName = element.name.nativeName[languageRef[0]].common;
	const languageList = languageRef.map((eachLanguage) => {
		return element.languages[eachLanguage];
	});

	// ! ---------------------

	const newNativeName = countryNativeName,
		newSubRegion = `${element.subregion}`,
		newTopDomain = `${element.tld[0]}`,
		newCurrency = countryCurrency,
		newLanguage = languageList,
		newBorders = countryBorder;

	// ! ---------------------

	newCard.setAttribute("data-nativeName", newNativeName);
	newCard.setAttribute("data-subRegion", newSubRegion);
	newCard.setAttribute("data-topDomain", newTopDomain);
	newCard.setAttribute("data-currency", newCurrency);
	newCard.setAttribute("data-language", newLanguage);
	newCard.setAttribute("data-borders", newBorders);
}

//? GET CARD BY REGION -----------------------------

async function getRegion(url) {
	const link = await fetch(url);
	data = await link.json();

	data.forEach((eachData) => {
		cardCreator(eachData);
		console.log(eachData);
	});
}

dropDownMenu.addEventListener("click", (event) => {
	cardContainer.innerHTML = "";
	const target = event.target.id;

	const url = `https://restcountries.com/v3.1/region/${target}`;
	getRegion(url);
});

//? GET CARDS BY SEARCH -----------------------------

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

function enter(event) {
	if (event.code === "Enter") {
		if (searchInput.value !== "") getName();
		else {
			searchInput.placeholder = "Please enter a country name";
			searchInput.classList.add("active");
		}
	}
}

searchIcon.addEventListener("click", getName);
searchInput.addEventListener("keydown", enter);

//! PREVIEW CARD =========================================================

const searchNav = document.querySelector(".search-nav");
const container = document.querySelector(".container");
const cards = document.querySelectorAll(".card");
const main = document.querySelector("main");

//? Creating a preview card ----------------------------------

function previewCard(eachCard) {
	eachCard.addEventListener("click", () => {
		console.dir(eachCard);
		main.style.display = "none";
		const cardPreview = document.createElement("div");
		cardPreview.classList.add("card-preview");
		cardPreview.innerHTML = `								 					
								<div class="back-button theme-changeable">
									<i class="text fa-solid fa-arrow-left-long"></i>
									<p class="text">Back</p>
								</div
								<section class="preview-main-container">
									<img class="card-flag preview-flag" src="${eachCard.firstElementChild.currentSrc}" alt="" />
									<section class="card-details-container">
										<article class="card-details-top">
											<h2 class="text card-preview-name">${eachCard.lastElementChild.firstElementChild.innerText}</h2>
											<div class="card-details-top-group">
												<div class="details-item">
													<h3 class="data text native-name">Native Name:</h3>
													<p class="text">${eachCard.dataset.nativename}</p>
												</div>
												<div class="details-item">
													<h3 class="data text population">Population:</h3>
													<p class="text">${eachCard.lastElementChild.lastElementChild.firstElementChild.lastElementChild.innerText}</p>
												</div>
												<div class="details-item">
													<h3 class="data text region">Region:</h3>
													<p class="text">${eachCard.lastElementChild.lastElementChild.children[1].lastElementChild.innerText}</p>
												</div>
												<div class="details-item">
													<h3 class="data text sub-region">Sub Region:</h3>
													<p class="text">${eachCard.dataset.subregion}</p>
												</div>
												<div class="details-item">
													<h3 class="data text capital">Capital:</h3>
													<p class="text">${eachCard.lastElementChild.lastElementChild.children[2].lastElementChild.innerText}</p>
												</div>
											</div>
										</article>
										<article class="card-details-bottom">
											<div class="details-item">
												<h3 class="data text tld">Top Level Domain:</h3>
												<p class="text">${eachCard.dataset.topdomain}</p>
											</div>
											<div class="details-item">
												<h3 class="data text currencies">Currencies:</h3>
												<p class="text">${eachCard.dataset.currency}</p>
											</div>
											<div class="details-item">
												<h3 class="data text language">Languages:</h3>
												<p class="text">${eachCard.dataset.language}</p>
											</div>
										</article>
										<footer class="card-details-footer">
											<h2 class="footer-heading text">Border Countries:</h2>
											<div class="borders-container">
												<div class="borders-item border-1 theme-changeable"><p class="text">n / a</p></div>
												<div class="borders-item border-2 theme-changeable"><p class="text">n / a</p></div>
												<div class="borders-item border-3 theme-changeable"><p class="text">n / a</p></div>
											</div>
										</footer>
									</section>
								</section>
							
			`;

		container.append(cardPreview);
		const currentCard = document.querySelector(".card-preview");
		const backButton = document.querySelector(".back-button");
		back(backButton, currentCard);

		// //* dark mode for new cards -----------------

		const allNewerText = document.querySelectorAll(".text");
		const allNewerElement = document.querySelectorAll(".theme-changeable");
		checkTheme(allNewerText, allNewerElement);
	});
}

cards.forEach((eachCard) => {
	eachCard.addEventListener("click", previewCard(eachCard));
});

//? Creating a back button ----------------------------------

function back(button, currentContainer) {
	button.addEventListener("click", () => {
		main.style.display = "block";
		container.removeChild(currentContainer);
	});
}

//! Dark Mode =====================================================

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
	searchInput.style.color = "white";
}

function lightTheme(texts, backgrounds) {
	texts.forEach((eachText) => {
		eachText.style.color = "black";
	});
	backgrounds.forEach((eachElement) => {
		eachElement.style.backgroundColor = "white";
	});
	body.style.backgroundColor = "hsl(0, 0%, 98%)";
	searchInput.style.color = "black";
}

darkMode.addEventListener("click", changeTheme);
