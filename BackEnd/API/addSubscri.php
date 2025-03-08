<?php
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");

include('../database/db.php');  // Inclua sua conexão com o banco de dados

// Receber os dados via POST
$data = json_decode(file_get_contents('php://input'), true);

// Verificar se os dados foram recebidos corretamente
if (!isset($data['cliente_id'], $data['produto_id'], $data['data_subscricao'], $data['status'])) {
    echo json_encode(['success' => false, 'message' => 'Dados incompletos']);
    exit();
}

// Atribuir os dados recebidos a variáveis
$cliente_id = $data['cliente_id'];
$produto_id = $data['produto_id'];
$data_subscricao = $data['data_subscricao'];
$status = $data['status'];

// Inserir a subscrição no banco de dados
$query = "INSERT INTO Subscricoes (cliente_id, produto_id, data_subscricao, status) 
          VALUES (?, ?, ?, ?)";

$stmt = $conn->prepare($query);
$stmt->bind_param("iiss", $cliente_id, $produto_id, $data_subscricao, $status);

// Verificar se a execução da consulta foi bem-sucedida
if ($stmt->execute()) {
    echo json_encode(['success' => true, 'message' => 'Subscrição registrada com sucesso']);
} else {
    echo json_encode(['success' => false, 'message' => 'Erro ao registrar subscrição']);
}

// Fechar a declaração e a conexão
$stmt->close();
$conn->close();
?>
