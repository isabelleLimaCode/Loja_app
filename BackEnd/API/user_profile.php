<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type");

include('../database/db.php');  

if (!isset($_GET['id'])) {
    echo json_encode([
        'success' => false,
        'message' => 'Parâmetro "id" não fornecido'
    ]);
    exit;
}

$id = $_GET['id'];

// Verifique se a conexão foi estabelecida corretamente
if (!$conn) {
    echo json_encode([
        'success' => false,
        'message' => 'Falha na conexão com o banco de dados'
    ]);
    exit;
}

// Consulta SQL - Alteração para usar 'cliente_id' e a tabela 'Clientes'
$sql = "SELECT nome, telefone, email , password FROM Clientes WHERE cliente_id = ?";
if ($stmt = $conn->prepare($sql)) {
    $stmt->bind_param("i", $id);
    $stmt->execute();
    $stmt->store_result();

    if ($stmt->num_rows > 0) {
        $stmt->bind_result($nome, $telefone, $email, $password);
        $stmt->fetch();
        echo json_encode([
            'success' => true,
            'user' => [
                'nome' => $nome,
                'telefone' => $telefone,
                'email' => $email,
            ]
        ]);
    } else {
        echo json_encode([
            'success' => false,
            'message' => 'Cliente não encontrado'
        ]);
    }
    $stmt->close();
} else {
    echo json_encode([
        'success' => false,
        'message' => 'Erro ao preparar a consulta'
    ]);
}

// Fechar a conexão
$conn->close();
?>
