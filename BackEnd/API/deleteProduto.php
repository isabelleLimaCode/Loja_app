<?php
header('Content-Type: application/json');// defini em formato json
header("Access-Control-Allow-Origin: *"); // pode vim de qualquer lugar
header("Access-Control-Allow-Methods: POST");// enviar dados post para api

include('../database/db.php');  // sua conexão com o banco de dados

// Receber os dados via POST
$data = json_decode(file_get_contents('php://input'), true);//decodifica em json ou manda o erro em json

// Verificar se os dados foram recebidos corretamente
if (!isset($data['produto_id'])) {
    echo json_encode(['success' => false, 'message' => 'Dados incompletos']);
    exit();
}

// Atribuir os dados recebidos a variáveis
$produto_id = $data['produto_id'];

// Primeiro, remover as subscrições relacionadas ao produto porque as subscriçao esta relacionada com o produto
$deleteSubscricoesQuery = "DELETE FROM subscricoes WHERE produto_id = ?";
$stmtSubscricoes = $conn->prepare($deleteSubscricoesQuery);
$stmtSubscricoes->bind_param("i", $produto_id);

if (!$stmtSubscricoes->execute()) {
    echo json_encode(['success' => false, 'message' => 'Erro ao remover subscrições']);// decodiica em JSON se não for retorna um erro em JSON
    exit();// se encontra um erro ele para a execução
}

//remover o produto da base de dados
$query = "DELETE FROM Produtos WHERE produto_id = ?";  // Tabela de Produtos
$stmt = $conn->prepare($query);
$stmt->bind_param("i", $produto_id);

// Verificar se a execução da consulta foi bem-sucedida
if ($stmt->execute()) {
    echo json_encode(['success' => true, 'message' => 'Produto removido com sucesso']);//alerta de sucesso
} else {
    echo json_encode(['success' => false, 'message' => 'Erro ao remover produto']);//alerta de erro
}

// Fechar a declaração e a conexão
$stmt->close();
$stmtSubscricoes->close();
$conn->close();
?>
