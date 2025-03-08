<?php
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");

include('../database/db.php');  // Inclua sua conexão com o banco de dados

// Receber os dados via POST
$data = json_decode(file_get_contents('php://input'), true);

// Verificar se os dados foram recebidos corretamente
if (!isset($data['produto_id'])) {
    echo json_encode(['success' => false, 'message' => 'Dados incompletos']);
    exit();
}

// Atribuir os dados recebidos a variáveis
$produto_id = $data['produto_id'];

// Primeiro, remover as subscrições relacionadas ao produto
$deleteSubscricoesQuery = "DELETE FROM subscricoes WHERE produto_id = ?";
$stmtSubscricoes = $conn->prepare($deleteSubscricoesQuery);
$stmtSubscricoes->bind_param("i", $produto_id);

if (!$stmtSubscricoes->execute()) {
    echo json_encode(['success' => false, 'message' => 'Erro ao remover subscrições']);
    exit();
}

// Agora, remover o produto da base de dados
$query = "DELETE FROM Produtos WHERE produto_id = ?";  // Tabela de Produtos
$stmt = $conn->prepare($query);
$stmt->bind_param("i", $produto_id);

// Verificar se a execução da consulta foi bem-sucedida
if ($stmt->execute()) {
    echo json_encode(['success' => true, 'message' => 'Produto removido com sucesso']);
} else {
    echo json_encode(['success' => false, 'message' => 'Erro ao remover produto']);
}

// Fechar a declaração e a conexão
$stmt->close();
$stmtSubscricoes->close();
$conn->close();
?>
