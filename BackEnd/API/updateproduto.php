<?php
header('Content-Type: application/json');// formato de arquivo que será enviado em json
header("Access-Control-Allow-Origin: *");// Permite o acesso a API de qualquer origem
header("Access-Control-Allow-Methods: POST");// método de requisição permitido

include('../database/db.php');// arquivo de conexão ao banco de dados

// Receber os dados via POST
$data = json_decode(file_get_contents('php://input'), true);

// Verificar se os dados foram recebidos corretamente
if (!isset($data['produto_id'], $data['nome_produto'], $data['descricao'], $data['preco'], $data['estoque'])) {
    echo json_encode(['success' => false, 'message' => 'Dados incompletos']);
    exit();
}

// Atribuir os dados recebidos a variáveis
$produto_id = $data['produto_id'];
$nome_produto = $data['nome_produto'];
$descricao = $data['descricao'];
$preco = $data['preco'];
$estoque = $data['estoque'];

// Atualizar o produto no banco de dados
$query = "UPDATE produtos SET nome_produto = ?, descricao = ?, preco = ?, estoque = ? WHERE produto_id = ?";
$stmt = $conn->prepare($query); // Corrigido para usar a variável correta
$stmt->bind_param("ssdii", $nome_produto, $descricao, $preco, $estoque, $produto_id);// i = integer, s = string, d = double

// Verificar se a preparação da consulta foi bem-sucedida
if ($stmt->execute()) {
    echo json_encode(['success' => true, 'message' => 'Produto atualizado com sucesso']);
} else {
    echo json_encode(['success' => false, 'message' => 'Erro ao atualizar produto']);
}

// Fechar a declaração e a conexão
$stmt->close();
$conn->close();
?>
