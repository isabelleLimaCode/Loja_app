<?php
$servername = "localhost";
$username = "root"; 
$password = "";
$dbname = "loja";

// Criar conexão ao MySQL
$conn = new mysqli($servername, $username, $password);

// Verificar conexão
if ($conn->connect_error) {
    die("Falha na conexão: " . $conn->connect_error);
}

// Criar base de dados
$sql = "CREATE DATABASE IF NOT EXISTS $dbname";
if ($conn->query($sql) === TRUE) {
    echo "Base de dados criada com sucesso\n";
} else {
    die("Erro ao criar a base de dados: " . $conn->error);
}

// Selecionar a base de dados
$conn->select_db($dbname);

// Importar SQL do ficheiro `database.sql`
$sqlScript = file_get_contents("database.sql");
if ($conn->multi_query($sqlScript)) {
    echo "Tabelas criadas com sucesso!";
} else {
    echo "Erro ao importar tabelas: " . $conn->error;
}

// Fechar conexão
$conn->close();
?>
