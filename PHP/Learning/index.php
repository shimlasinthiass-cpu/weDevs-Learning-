<?php

require 'functions.php';
require 'Database.php';
// require 'router.php';

$config = require 'config.php';

$db = new Database($config['database']);

$id = $_GET['id'] ?? null;


if($id == null){
    $query = "SELECT * FROM products";
    $posts = $db->query($query, [])->fetchAll();
}

else{
    // dd($id);
    $query = "SELECT * FROM products where id = ?";
    $posts = $db->query($query, [$id])->fetchAll();
}

dd($posts);
// foreach ($posts as $post) {
//     echo '<h1><li>' . $post['name'] . '</li></h1>';
// }

