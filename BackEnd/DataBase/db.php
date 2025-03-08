<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "Loja";

// Criar a conexão
$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar se há erro na conexão
if ($conn->connect_error) {
    die("Conexão falhou: " . $conn->connect_error);
}
?>
