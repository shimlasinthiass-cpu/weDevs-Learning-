<?php

// dd($_SERVER['REQUEST_URI']);

$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);


$routes = [
    '/' => 'controllers/index.php',
    '/index' => 'controllers/index.php',
    '/about' => 'controllers/about.php',
    '/projects' => 'controllers/projects.php',
    '/calander' => 'controllers/calander.php',
    '/reports' => 'controllers/reports.php'  
];


function routeToController($uri, $routes){
    if(array_key_exists($uri, $routes)){
        require $routes[$uri];
    } else {
        abort();
    }
}

function abort($code = 404){
    http_response_code($code);
    require "views/{$code}.view.php";
    die();
}

routeToController($uri, $routes);
