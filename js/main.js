const pages = [
	'home',
	'summary',
	'projects',
	'contact'
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