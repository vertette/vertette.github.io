document.addEventListener('DOMContentLoaded', function() {
	// all external links open in a new tab
	let internal = location.host.replace("www.", "");
	internal = new RegExp(internal, "i");

	let linkArray = document.getElementsByTagName('A');
	for (let i = 0; i < linkArray.length; i++) {
    	if (!internal.test(linkArray[i].host)) linkArray[i].target = "_blank";
	}
});