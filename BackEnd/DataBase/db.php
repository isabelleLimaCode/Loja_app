<?php
$servername = "localhost";
$username = "root"; 
$password = "";
$dbname = "Loja";

// Criar conexão

try{
    $conn = new mysqli($servername, $username, $password, $dbname);
}catch(Exception $e){
    echo "Erro na conexão";
}

// Verificar conexão
if ($conn) {
    echo "Conexão bem sucedida";
}else{
    echo "Erro na conexão";
}
?>
