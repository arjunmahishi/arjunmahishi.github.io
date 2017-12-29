//// Custom Router ////
const pages = [
	'main',
	'publications',
	'projects'
];

window.addEventListener("hashchange", () => {
	pages.map(page => {
		if(page === location.hash.replace("#", "")){
			document.querySelector(`#${page}`).style.display = "block";
		}else{
			document.querySelector(`#${page}`).style.display = "none";
		}
	})
});

//// Color changer ////

const randomHexColorCode = () => {
	let n = ((Math.random() * 0xfffff) | 0).toString(16);
	return '#' + (n.length !== 6 ? ((Math.random() * 0xf) | 0).toString(16) + n : n);
};

setInterval(() => {
	document.querySelector(".name").style.color = randomHexColorCode();
	Array.prototype.slice.call(document.querySelectorAll(".btn")).map(button => {
		button.style.borderColor = randomHexColorCode();
		button.style.color = randomHexColorCode();
	})
}, 250);

////  ////