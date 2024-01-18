const body = document.body;

//! DROPDOWN ===============================================================================

const select = document.querySelector(".select");
const dropDownMenu = document.querySelector(".dropdown");
const dropDownItems = document.querySelectorAll(".drop");

select.addEventListener("click", () => {
	select.classList.toggle("active");
	dropDownMenu.classList.toggle("active");
});

//! API ====================================================================================

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

	// //* dark mode for new cards -----------------

	const allNewText = document.querySelectorAll(".text");
	const allNewElement = document.querySelectorAll(".theme-changeable");
	checkTheme(allNewText, allNewElement);
}

function addData(element, newCard) {
	const languageRef = Object.keys(element.languages);
	const currencyRef = Object.keys(element.currencies);
	const countryCurrency = element.currencies[currencyRef[0]].name;
	const countryNativeName = element.name && element.name.nativeName ? element.name.nativeName[languageRef[0]].common : "N / A";
	const languageList = languageRef.map((each) => {
		return element.languages[each];
	});

	// ! ---------------------

	const newNativeName = countryNativeName,
		newSubRegion = `${element.subregion}`,
		newTopDomain = `${element.tld[0]}`,
		newCurrency = countryCurrency,
		newLanguage = languageList.join(" ");

	// ! ---------------------

	newCard.setAttribute("data-nativeName", newNativeName);
	newCard.setAttribute("data-subRegion", newSubRegion);
	newCard.setAttribute("data-topDomain", newTopDomain);
	newCard.setAttribute("data-currency", newCurrency);
	newCard.setAttribute("data-language", newLanguage);
}

//? GET CARD BY REGION -----------------------------

async function getRegion(url) {
	const link = await fetch(url);
	data = await link.json();

	data.forEach((eachData) => {
		cardCreator(eachData);
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

searchIcon.addEventListener("click", getName);

//! PREVIEW CARD =================================================================================

const searchNav = document.querySelector(".search-nav");
const cards = document.querySelectorAll(".card");
const container = document.querySelector(".container");
const main = document.querySelector("main");

//? Creating a preview card

cards.forEach((eachCard) => {
	eachCard.addEventListener("click", () => {
		console.log(eachCard);
		main.style.display = "none";
		const cardPreview = document.createElement("div");
		cardPreview.classList.add("card-preview");
		cardPreview.innerHTML = `
	<div class="card-preview">
	<div class="back-button">
		<i class="text fa-solid fa-arrow-left-long"></i>
		<p class="text">Back</p>
	</div>
	<section class="preview-main-container">
		<img class="card-flag preview-flag" src="https://flagcdn.com/w320/de.png" alt="" />
		<section class="card-details-container">
			<article class="card-details-top">
				<h2 class="text card-preview-name">Belgium</h2>
				<div class="card-details-top-group">
					<div class="details-item">
						<h3 class="data text native-name">Native Name:</h3>
						<p class="text">Belgie</p>
					</div>
					<div class="details-item">
						<h3 class="data text population">Population:</h3>
						<p class="text">11,319,511</p>
					</div>
					<div class="details-item">
						<h3 class="data text region">Region:</h3>
						<p class="text">Europe</p>
					</div>
					<div class="details-item">
						<h3 class="data text sub-region">Sub Region:</h3>
						<p class="text">Western Europe</p>
					</div>
					<div class="details-item">
						<h3 class="data text capital">Capital:</h3>
						<p class="text">Brussels</p>
					</div>
				</div>
			</article>
			<article class="card-details-bottom">
				<div class="details-item">
					<h3 class="data text tld">Top Level Domain:</h3>
					<p class="text">.be</p>
				</div>
				<div class="details-item">
					<h3 class="data text currencies">Currencies:</h3>
					<p class="text">Euro</p>
				</div>
				<div class="details-item">
					<h3 class="data text language">Languages:</h3>
					<p class="text">Dutch, French, German</p>
				</div>
			</article>
			<footer class="card-details-footer">
				<h2 class="footer-heading">Border Countries:</h2>
				<div class="borders-container">
					<div class="borders-item border-1">France</div>
					<div class="borders-item border-2">Germany</div>
					<div class="borders-item border-3">Netherlands</div>
				</div>
			</footer>
		</section>
	</section>
</div>
`;
		container.append(cardPreview);
	});
});

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
