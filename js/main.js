//// Custom Router ////
const pages = [
	'main',
	'blog-links',
	'projects'
];

const openPage = target => {
	pages.map(page =>{
		if(page === target){
			document.querySelector(`#${page}`).style.display = "block";
		}else{
			document.querySelector(`#${page}`).style.display = "none";
		}
	})
}

openPage("main");
////		////

