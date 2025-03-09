<?php
$servername = "localhost";//servidor
$username = "root";//usuário
$password = "";
$dbname = "Loja";//nome do banco de dados

// Criar a conexão
$conn = new mysqli($servername, $username, $password, $dbname);//conexão com o banco de dados

// Verificar se há erro na conexão
if ($conn->connect_error) {
    die("Conexão falhou: " . $conn->connect_error);
}
?>
