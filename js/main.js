//// Router ////
const pages = [
	'main',
	'publications',
	'projects'
];

const openPage = (target) => {
	pages.map(page => {
		if(page === target){
			document.querySelector(`#${page}`).style.display = "block";
		}else{
			document.querySelector(`#${page}`).style.display = "none";
		}
	})
}

window.addEventListener("hashchange", () => {
	openPage(location.hash.replace("#", ""));
});

if(location.hash === "") location.hash = "#main"; // Edge case
openPage(location.hash.replace("#", "")); // First load

//// Color changer ////

const colorFrequency = 250; // milli seconds

const randomHexColorCode = () => {
	let n = ((Math.random() * 0xfffff) | 0).toString(16);
	return '#' + (n.length !== 6 ? ((Math.random() * 0xf) | 0).toString(16) + n : n);
};

setInterval(() => {
	
	document.querySelector(".name").style.color = randomHexColorCode();

	Array.prototype.slice.call(document.querySelectorAll(".nav-btn")).map(button => {
		button.style.borderColor = randomHexColorCode();
		button.style.color = randomHexColorCode();
	})

	Array.prototype.slice.call(document.querySelectorAll(".card-title")).map(title => {
		title.style.borderColor = randomHexColorCode();
		title.style.color = randomHexColorCode();
	})

}, colorFrequency);

//// Projects updater ////

fetch("projects.json").then((response) => {
	response.json().then(data => {
		data.projects.map(project => {

			let github = "";

			if(project.github) github = `
			<a href="${project.github}" target="_blank">
		        <button class="btn">Github link</button>
		    </a>`;

			let card = `
			<div class="card">
			    <div class="card-title">${project.name}</div>
			    <p>${project.description}</p>
			    <a href="${project.link}" target="_blank">
			        <button class="btn">${project.linkType}</button>
			    </a>
			    ${github}
			</div>`;

			document.querySelector(".pro-list").innerHTML += card;
		})
	})
})

//// Publications updater ////

fetch("publications.json").then((response) => {
	response.json().then(data => {
		data.posts.map(post => {
			let card = `
			<div class="card">
			    <div class="card-title">${post.name}</div>
			    <p>Hosted on: <a href="${post.hostLink}" target="_blank">${post.host}</a></p>
			    <p>${post.description}</p>
			    <a href="${post.link}" target="_blank">
			        <button class="btn">Read post</button>
			    </a>
			</div>`;

			document.querySelector(".pub-list").innerHTML += card;
		})
	})
})