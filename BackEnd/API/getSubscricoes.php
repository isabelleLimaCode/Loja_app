<?php
header("Access-Control-Allow-Origin: *"); // Permite acesso de qualquer origem
header("Content-Type: application/json"); // Define o retorno como JSON
header("Access-Control-Allow-Methods: GET"); // Permite apenas requisições GET
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// Conectar à base de dados
$servername = "localhost"; // servidor MySQL
$username = "root"; // utilizador do MySQL
$password = ""; 
$database = "loja"; // Nome da base de dados

$conn = new mysqli($servername, $username, $password, $database);// Conectar à base de dados

// Verificar a conexão
if ($conn->connect_error) {// Verificar a conexão
    die(json_encode(["error" => "Falha na conexão com a base de dados: " . $conn->connect_error]));
}

// Verifica se cliente_id foi passado na URL
if (!isset($_GET['cliente_id'])) {// Verifica se cliente_id foi passado na URL
    echo json_encode(["success" => false, "message" => "Parâmetro cliente_id ausente"]);// Retorna uma mensagem de erro
    exit;
}

$cliente_id = intval($_GET['cliente_id']); // Garante que seja um número inteiro

$produtos = [];

$sql = "SELECT p.produto_id, p.nome_produto, p.descricao, p.preco, p.estoque 
        FROM Subscricoes s
        INNER JOIN Produtos p ON s.produto_id = p.produto_id 
        WHERE s.cliente_id = ?"; // Seleciona as subscrições do cliente

$stmt = $conn->prepare($sql);// Prepara a query
$stmt->bind_param("i", $cliente_id); // Associa o parâmetro à query
$stmt->execute(); // mandar de forma mais segura a query
$result = $stmt->get_result();// Executa a query

// Verifica se há produtos na base de dados
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {// Enquanto houver produtos
        $produtos[] = $row; // Adiciona o produto ao array
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
