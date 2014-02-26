var template = document.querySelector('script[type=mustache]');

var xmlhttp = new XMLHttpRequest();

xmlhttp.onreadystatechange = function() 
{
	if (xmlhttp.readyState == 4) 
	{ 
		document.body.innerHTML = Mustache.render(xmlhttp.responseText, data);
	} 
} 

xmlhttp.open("GET", template.src, true); 
xmlhttp.send();

