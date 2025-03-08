<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");

include('../database/db.php'); // Conectar ao banco de dados

$data = json_decode(file_get_contents("php://input"), true);

// Verifica se os dados necessários foram enviados
if (!isset($data['id'], $data['nome'], $data['email'], $data['telefone'])) {
    echo json_encode(['success' => false, 'message' => 'Dados incompletos']);
    exit;
}

$id = $data['id'];
$nome = $data['nome'];
$email = $data['email'];
$telefone = $data['telefone'];

// Atualiza os dados do cliente
$sql = "UPDATE Clientes SET nome = ?, email = ?, telefone = ? WHERE cliente_id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("sssi", $nome, $email, $telefone, $id);

if ($stmt->execute()) {
    echo json_encode(['success' => true, 'message' => 'Perfil atualizado com sucesso']);
} else {
    echo json_encode(['success' => false, 'message' => 'Erro ao atualizar perfil']);
}

$stmt->close();
$conn->close();
?>
