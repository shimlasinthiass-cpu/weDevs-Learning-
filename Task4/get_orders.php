<?php
require 'Database.php';
$config = require 'config.php';

$db = new Database($config['database']);

$orders = $db->query("SELECT * FROM orders ORDER BY created_at DESC")->fetchAll();

foreach ($orders as &$order) {
    $items = $db->query(
        "SELECT * FROM order_items WHERE order_id = ?",
        [$order['id']]
    )->fetchAll();

    $order['items'] = $items;
}

header('Content-Type: application/json');
echo json_encode($orders);
