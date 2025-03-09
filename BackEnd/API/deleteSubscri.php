<?php
header('Content-Type: application/json');// defini em formato json
header("Access-Control-Allow-Origin: *");// pode vim de qualquer lugar
header("Access-Control-Allow-Methods: POST");// enviar dados post para api

include('../database/db.php');  // Inclua sua conexão com o banco de dados

// Receber os dados via POST
$data = json_decode(file_get_contents('php://input'), true);//decodifica em json ou manda o erro em json

// Verificar se os dados foram recebidos corretamente
if (!isset($data['cliente_id'], $data['produto_id'])) {
    echo json_encode(['success' => false, 'message' => 'Dados incompletos']);
    exit();
}

// Atribuir os dados recebidos a variáveis
$cliente_id = $data['cliente_id'];
$produto_id = $data['produto_id'];

// Remover a subscrição do banco de dados
$query = "DELETE FROM Subscricoes WHERE cliente_id = ? AND produto_id = ? AND status = 'ativa'";

$stmt = $conn->prepare($query);
$stmt->bind_param("ii", $cliente_id, $produto_id);

// Verificar se a execução da consulta foi bem-sucedida
if ($stmt->execute()) {
    echo json_encode(['success' => true, 'message' => 'Subscrição removida com sucesso']);
} else {
    echo json_encode(['success' => false, 'message' => 'Erro ao remover subscrição']);
}

// Fechar a declaração e a conexão
$stmt->close();
$conn->close();
?>
