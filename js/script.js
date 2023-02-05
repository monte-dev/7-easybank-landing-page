("use strict");
const templates = {
	// eslint-disable-next-line no-undef
	articlesContent: Handlebars.compile(
		document.querySelector("#template-article-content").textContent
	),
	// eslint-disable-next-line no-undef
	servicesContent: Handlebars.compile(
		document.querySelector("#template-services-content").textContent
	),
	// eslint-disable-next-line no-undef
	linksFooter: Handlebars.compile(
		document.querySelector("#template-footer-links").textContent
	),
	// eslint-disable-next-line no-undef
	linksHeader: Handlebars.compile(
		document.querySelector("#template-header-links").textContent
	),
};
function getLocalData() {
	fetch("./js/data.json")
		.then((res) => res.json())
		.then((responseData) => {
			generateArticles(responseData);
			generateLinks(responseData);
			generateServices(responseData);
		})
		.catch((error) => {
			console.error(error);
		});
}
getLocalData();

function generateLinks(responseData) {
	// top navigation links
	let headerLinksWrapper = document.querySelector(".header-links");
	let headerLinks = templates.linksHeader({link: responseData.headerLinks});
	headerLinksWrapper.innerHTML = headerLinks;
	
	console.log(headerLinks);
	
	// footer links
	let footerLinksWrapper = document.querySelector(".footer-nav");
	let footerLinks = templates.linksFooter({link: responseData.footerLinks});
	footerLinksWrapper.innerHTML = footerLinks;
		
}

function generateArticles(responseData) {
	let container = document.querySelector(".articles-wrapper");
	let html = templates.articlesContent({ article: responseData.articles });
	container.innerHTML = html;
}
function generateServices(responseData) {
	let container = document.querySelector(".services-wrapper");
	let html = templates.servicesContent({ service: responseData.services });
	container.innerHTML = html;
}
