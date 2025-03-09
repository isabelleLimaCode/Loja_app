<?php
header('Content-Type: application/json'); // defini em formato json
header("Access-Control-Allow-Origin: *"); // pode vim de qualquer lugar
header("Access-Control-Allow-Methods: POST");// enviar dados post para api

include('../database/db.php');  // conexão com o banco de dados

// Receber os dados via POST
$data = json_decode(file_get_contents('php://input'), true);// decodiica em JSON se não for retorna um erro em JSON

// Verificar se os dados foram recebidos corretamente
if (!isset($data['cliente_id'], $data['produto_id'], $data['data_subscricao'], $data['status'])) { // verifica se os dados estao completos
    echo json_encode(['success' => false, 'message' => 'Dados incompletos']);
    exit();
}

// Atribuir os dados recebidos a variáveis
$cliente_id = $data['cliente_id'];
$produto_id = $data['produto_id'];
$data_subscricao = $data['data_subscricao'];
$status = $data['status'];

// Verificar se o cliente já está subscrito ao produto com qualquer status (ativa ou não)
$query_check = "SELECT * FROM Subscricoes WHERE cliente_id = ? AND produto_id = ?";
$stmt_check = $conn->prepare($query_check); // faz a coneccao com o banco de dados
$stmt_check->bind_param("ii", $cliente_id, $produto_id); //bind e prepare para que os dados sao armazenados de forma segura
$stmt_check->execute();
$result_check = $stmt_check->get_result();

if ($result_check->num_rows > 0) {// verifica se ja existe uma subscrição
    // Se já existir uma subscrição (com qualquer status), retornar mensagem
    echo json_encode(['success' => false, 'message' => 'Você já está subscrito a este produto']);
    exit(); // se tiver ele fecha a conexão
}

// Inserir a subscrição no banco de dados
$query = "INSERT INTO Subscricoes (cliente_id, produto_id, data_subscricao, status) 
          VALUES (?, ?, ?, ?)";

$stmt = $conn->prepare($query);
$stmt->bind_param("iiss", $cliente_id, $produto_id, $data_subscricao, $status);// i- patrametros inteiros s- string

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
