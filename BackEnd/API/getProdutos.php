<?php
header("Content-Type: application/json");
require_once("../db.php");

$sql = "SELECT * FROM Produtos";
$result = $conn->query($sql);

$produtos = [];
while ($row = $result->fetch_assoc()) {
    $produtos[] = $row;
}

echo json_encode($produtos);
$conn->close();
?>
