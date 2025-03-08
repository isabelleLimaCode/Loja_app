<?php
header("Access-Control-Allow-Origin: *"); // Permite acesso de qualquer origem
header("Content-Type: application/json"); // Define o retorno como JSON
header("Access-Control-Allow-Methods: GET"); // Permite apenas requisições GET
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// Conectar à base de dados
$servername = "localhost"; // Ou IP do servidor MySQL
$username = "root"; // Substituir pelo utilizador do MySQL
$password = ""; // Substituir pela senha do MySQL
$database = "loja"; // Nome da base de dados

$conn = new mysqli($servername, $username, $password, $database);

// Verificar a conexão
if ($conn->connect_error) {
    die(json_encode(["error" => "Falha na conexão com a base de dados: " . $conn->connect_error]));
}

// Buscar clientes na base de dados
$sql = "SELECT cliente_id, nome, email, telefone, data_nascimento FROM Clientes";
$result = $conn->query($sql);

$clientes = [];

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $clientes[] = $row;
    }
}

// Fechar a conexão
$conn->close();

// Retornar os dados em formato JSON
echo json_encode($clientes);
?>
