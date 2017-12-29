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

}, colorFrequency);

//// Projects updater ////

fetch("projects.json").then((data) => {
	console.log(data.body);
})

// `<div class="card">
//     <div class="card-title">Test title</div>
//     <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
//     <a href="#">
//         <button class="btn">Link</button>
//     </a>
// </div>`

//// Publications updater ////