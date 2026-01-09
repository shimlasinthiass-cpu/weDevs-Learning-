<?php
require 'Database.php';
$config = require 'config.php';

$db = new Database($config['database']);

$data = json_decode(file_get_contents("php://input"), true);

if (!$data) {
    http_response_code(400);
    echo json_encode(["error" => "Invalid data"]);
    exit;
}

$orderStmt = $db->query(
    "INSERT INTO orders (order_id, subtotal, discount, total)
     VALUES (?, ?, ?, ?)",
    [
        $data['orderId'],
        $data['subtotal'],
        $data['discount'],
        $data['total']
    ]
);

$orderDbId = $db->connection->lastInsertId();

foreach ($data['items'] as $item) {
    $db->query(
        "INSERT INTO order_items
        (order_id, product_id, name, price, original_price, discounted)
        VALUES (?, ?, ?, ?, ?, ?)",
        [
            $orderDbId,
            $item['id'],
            $item['name'],
            $item['price'],
            $item['originalPrice'],
            $item['discounted'] ? 1 : 0
        ]
    );
}

echo json_encode(["success" => true]);
