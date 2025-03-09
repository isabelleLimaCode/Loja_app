<?php
$servername = "localhost";//servidor mqsl
$username = "root"; //usuário
$password = "";
$dbname = "loja";//nome do banco de dados

// Criar conexão ao MySQL
$conn = new mysqli($servername, $username, $password);

// Verificar conexão
if ($conn->connect_error) {
    die("Falha na conexão: " . $conn->connect_error);
}

// Criar base de dados
$sql = "CREATE DATABASE IF NOT EXISTS $dbname";//criar base de dados
if ($conn->query($sql) === TRUE) {//verificar se a base de dados foi criada
    echo "Base de dados criada com sucesso\n";
} else {
    die("Erro ao criar a base de dados: " . $conn->error);
}

// Selecionar a base de dados
$conn->select_db($dbname);//selecionar a base de dados

// Importar SQL do ficheiro `database.sql`
$sqlScript = file_get_contents("database.sql");//importar o ficheiro database.sql
if ($conn->multi_query($sqlScript)) {//verificar se o ficheiro foi importado
    echo "Tabelas criadas com sucesso!";
} else {
    echo "Erro ao importar tabelas: " . $conn->error;// se tiver erro manda uma mensagem com o erro
}

// Fechar conexão
$conn->close();
?>
