(function loadPartials() {
	var partials = document.querySelectorAll('script[type=mustache-partial]');
	
	var partialContent = new Object();
	
	var count = partials.length;
	
	for (var i = 0; i < partials.length; i++)
		loadFile(partials[i].src, function(file, request) {
			count--;
			
			var name = file.substring(file.lastIndexOf('/') + 1);
			name = name.substring(0, name.indexOf('.'));
			
			partialContent[name] = request.responseText;
	
			if (count <= 0)
				loadInternationalization(partialContent)
		});
})();

function loadInternationalization(partials) {
	var lang = document.querySelector('script[type=lang]');
	
	loadFile(lang.src, function(file, request) {
		var labels = JSON.parse(request.responseText);
	
		loadTemplate(partials, labels);
	});
}

function loadTemplate(partials, labels) {
	var template = document.querySelector('script[type=mustache]');
				
	data.labels = labels;
				
	loadFile(template.src, function(file, request) {
		document.body.innerHTML = Mustache.render(request.responseText, data, partials);
	});
}

function loadFile(file, callback) {
	var request = new XMLHttpRequest();
	
	request.onreadystatechange = function() 
	{
		if (request.readyState == 4) 
		{ 
			callback(file, request);
		} 
	} 
	
	request.open("GET", file, true); 
	request.send();
}