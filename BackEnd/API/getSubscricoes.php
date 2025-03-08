<?php
header("Content-Type: application/json");
require_once("../db.php");

$sql = "SELECT s.subscricao_id, c.nome AS cliente, p.nome_produto AS produto, s.data_subscricao, s.status 
        FROM Subscricoes s
        JOIN Clientes c ON s.cliente_id = c.cliente_id
        JOIN Produtos p ON s.produto_id = p.produto_id";

$result = $conn->query($sql);

$subscricoes = [];
while ($row = $result->fetch_assoc()) {
    $subscricoes[] = $row;
}

echo json_encode($subscricoes);
$conn->close();
?>
