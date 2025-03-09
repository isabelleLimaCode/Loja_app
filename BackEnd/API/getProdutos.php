<?php
header("Access-Control-Allow-Origin: *"); // Permite acesso de qualquer origem
header("Content-Type: application/json"); // Define o retorno como JSON
header("Access-Control-Allow-Methods: GET"); // Permite apenas requisições GET
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// Conectar à base de dados
$servername = "localhost"; //servidor MySQL
$username = "root"; // utilizador do MySQL
$password = ""; 
$database = "loja"; // Nome da base de dados

$conn = new mysqli($servername, $username, $password, $database);

// Verificar a conexão
if ($conn->connect_error) {
    die(json_encode(["error" => "Falha na conexão com a base de dados: " . $conn->connect_error]));
}

$produtos = []; // Array para armazenar os produtos

$sql = "SELECT produto_id, nome_produto, descricao, preco, estoque FROM Produtos";
$result = $conn->query($sql); // Executa a query

// Verifica se há produtos na base de dados
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {// Enquanto houver produtos
        $produtos[] = $row; // Adiciona o produto ao array
    }
    // Retorna os dados em formato JSON
    echo json_encode(["success" => true, "produtos" => $produtos]);// Retorna os produtos
} else {
    // Caso não haja produtos
    echo json_encode(["success" => false, "message" => "Nenhum produto encontrado"]);// Retorna uma mensagem de erro
}

// Fechar a conexão
$conn->close();
?>
