const darkMode = document.querySelector(".dark-mode");

//! Dark Mode --------------------------------

const allText = document.querySelectorAll(".text");
const allElement = document.querySelectorAll(".theme-changeable");
const body = document.body;

isLight = true;

function checkTheme() {
	if (isLight) {
		darkTheme();
	} else {
		lightTheme();
	}
}

function darkTheme() {
	isLight = false;
	allText.forEach((eachText) => {
		eachText.style.color = "white";
	});
	allElement.forEach((eachElement) => {
		eachElement.style.backgroundColor = "hsl(209, 23%, 22%)";
	});
	body.style.backgroundColor = "hsl(207, 26%, 17%)";
}

function lightTheme() {
	isLight = true;
	allText.forEach((eachText) => {
		eachText.style.color = "black";
	});
	allElement.forEach((eachElement) => {
		eachElement.style.backgroundColor = "white";
	});
	body.style.backgroundColor = "hsl(0, 0%, 98%)";
}

darkMode.addEventListener("click", checkTheme);

//! API --------------------------------

const cardContainer = document.querySelector(".cards-container");
let data;

async function initialCard() {
	const fetched = await fetch("data.json");
	const data = await fetched.json();
	console.log(data);

	data.forEach((eachData) => {
		const newDiv = document.createElement("div");
		newDiv.classList.add("card");
	});
}

initialCard();
