<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

$servername = "localhost"; // msyql host
$username = "root"; // mysql user
$password = "";
$dbname = "loja"; // mysql database name

// Conectar ao MySQL
$conn = new mysqli($servername, $username, $password, $dbname);// Conectar ao MySQL
if ($conn->connect_error) {
    die(json_encode(["success" => false, "message" => "Erro na conexão com a base de dados"]));
}

// Obter os dados enviados pelo React Native
$data = json_decode(file_get_contents("php://input"), true);// Obter os dados enviados pelo React Native
if (!isset($data["email"]) || !isset($data["password"])) {// Verificar se os dados estão completos
    die(json_encode(["success" => false, "message" => "Dados incompletos"]));
}

$email = $conn->real_escape_string($data["email"]); // Evitar SQL Injection
$password = $conn->real_escape_string($data["password"]);// Evitar SQL Injection

// Verificar se o utilizador existe
$query = "SELECT * FROM clientes WHERE email='$email' LIMIT 1"; // Verificar se o utilizador existe
$result = $conn->query($query); // Executar a query

if ($result->num_rows > 0) {
    $user = $result->fetch_assoc(); // Obter os dados do utilizador
    if ($password === $user["password"]) {  // verifica se password é a mesma que a da base de dados
        echo json_encode(["success" => true, "message" => "Login bem-sucedido", "user" => $user]);
    } else {
        echo json_encode(["success" => false, "message" => "Senha incorreta"]);
    }
} else {
    echo json_encode(["success" => false, "message" => "Utilizador não encontrado"]);
}

$conn->close();
?>
