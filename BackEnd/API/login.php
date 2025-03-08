<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "loja";

// Conectar ao MySQL
$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    die(json_encode(["success" => false, "message" => "Erro na conexão com a base de dados"]));
}

// Obter os dados enviados pelo React Native
$data = json_decode(file_get_contents("php://input"), true);
if (!isset($data["email"]) || !isset($data["password"])) {
    die(json_encode(["success" => false, "message" => "Dados incompletos"]));
}

$email = $conn->real_escape_string($data["email"]);
$password = $conn->real_escape_string($data["password"]);

// Verificar se o utilizador existe
$query = "SELECT * FROM clientes WHERE email='$email' LIMIT 1";
$result = $conn->query($query);

if ($result->num_rows > 0) {
    $user = $result->fetch_assoc();
    if ($password === $user["password"]) {  // Aqui deves usar hashing (bcrypt)
        echo json_encode(["success" => true, "message" => "Login bem-sucedido", "user" => $user]);
    } else {
        echo json_encode(["success" => false, "message" => "Senha incorreta"]);
    }
} else {
    echo json_encode(["success" => false, "message" => "Utilizador não encontrado"]);
}

$conn->close();
?>
