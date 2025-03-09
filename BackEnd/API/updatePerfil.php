<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");

include('../database/db.php'); // Conectar ao banco de dados

$data = json_decode(file_get_contents("php://input"), true);// decodifica os dados en jason ou manda um erro em json

// Verifica se os dados necessários foram enviados
if (!isset($data['id'], $data['nome'], $data['email'], $data['telefone'])) {// Se algum dos campos estiver vazio
    echo json_encode(['success' => false, 'message' => 'Dados incompletos']);// Retorna uma mensagem de erro se nao tiver todos os campos preenchidos
    exit;
}
// Verifica se o cliente existe
$id = $data['id'];
$nome = $data['nome'];
$email = $data['email'];
$telefone = $data['telefone'];

// Atualiza os dados do cliente
$sql = "UPDATE Clientes SET nome = ?, email = ?, telefone = ? WHERE cliente_id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("sssi", $nome, $email, $telefone, $id);//s = string, i = integer

if ($stmt->execute()) {// Se a query foi executada com sucesso
    echo json_encode(['success' => true, 'message' => 'Perfil atualizado com sucesso']);
} else {
    echo json_encode(['success' => false, 'message' => 'Erro ao atualizar perfil']);
}

$stmt->close();
$conn->close();
?>
