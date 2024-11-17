import "../styles/main.scss";

// import UI Components
import { module } from "./components/module";

const main = () => {
	// Media Query
	const mq = window.matchMedia("(min-width: 768px)").matches;

	// UI Component Elements
	const $body = document.body;

	// init
	module($body);

};

document.addEventListener("DOMContentLoaded", function () {
	const scrollbarWidth =
		window.innerWidth - document.documentElement.clientWidth;
	document.documentElement.style.setProperty(
		"--scrollbar-width",
		scrollbarWidth + "px"
	);

	//init
	main();
});
