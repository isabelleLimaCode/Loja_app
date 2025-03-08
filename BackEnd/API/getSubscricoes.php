<?php
header("Access-Control-Allow-Origin: *"); // Permite acesso de qualquer origem
header("Content-Type: application/json"); // Define o retorno como JSON
header("Access-Control-Allow-Methods: GET"); // Permite apenas requisições GET
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// Conectar à base de dados
$servername = "localhost"; // Ou IP do servidor MySQL
$username = "root"; // Substituir pelo utilizador do MySQL
$password = ""; 
$database = "loja"; // Nome da base de dados

$conn = new mysqli($servername, $username, $password, $database);

// Verificar a conexão
if ($conn->connect_error) {
    die(json_encode(["error" => "Falha na conexão com a base de dados: " . $conn->connect_error]));
}

// Verifica se cliente_id foi passado na URL
if (!isset($_GET['cliente_id'])) {
    echo json_encode(["success" => false, "message" => "Parâmetro cliente_id ausente"]);
    exit;
}

$cliente_id = intval($_GET['cliente_id']); // Garante que seja um número inteiro

$produtos = [];

$sql = "SELECT p.produto_id, p.nome_produto, p.descricao, p.preco, p.estoque 
        FROM Subscricoes s
        INNER JOIN Produtos p ON s.produto_id = p.produto_id
        WHERE s.cliente_id = ?";

$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $cliente_id);
$stmt->execute();
$result = $stmt->get_result();

// Verifica se há produtos na base de dados
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $produtos[] = $row;
    }
    // Retorna os dados em formato JSON
    echo json_encode(["success" => true, "produtos" => $produtos]);
} else {
    // Caso não haja produtos
    echo json_encode(["success" => false, "message" => "Nenhuma subscrição encontrada para este cliente"]);
}

// Fechar a conexão
$stmt->close();
$conn->close();
?>
