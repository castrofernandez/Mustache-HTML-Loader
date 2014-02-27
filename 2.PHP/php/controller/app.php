<?php
	$languages = array('en', 'es', 'fr');

	function loadTemplate($template) {
		// Mustache loader
		require 'php/Mustache/Autoloader.php';
		Mustache_Autoloader::register();

		// Create Mustache engine
		$mustache = new Mustache_Engine(array(
			'loader' => new Mustache_Loader_FilesystemLoader('views'),
			'partials_loader' => new Mustache_Loader_FilesystemLoader('views/partials')
		));

		// Read view template
		$template = $mustache->loadTemplate($template);
	
		$data = loadData();

		// Load selected language labels
		$language = getLanguage('en');
		$labels = json_decode(file_get_contents("lang/$language.json"), true);
		$data['labels'] = $labels;
	
		echo $template->render($data);
	}
	
	function getLanguage($default) {
		global $languages;
	
		// Add current language
		$language = isset($_GET['language']) ? $_GET['language'] : '';
	
		if (empty($language) && isset($_SERVER["HTTP_ACCEPT_LANGUAGE"])) {
			$language =  substr($_SERVER['HTTP_ACCEPT_LANGUAGE'], 0, 2);
		}
	
		if (empty($language) || !in_array($language, $languages))
			$language = $default;
	
		return $language;
	}
	
	function loadData() {
		return json_decode(file_get_contents("php/model/data.json"), true);
	}
?>