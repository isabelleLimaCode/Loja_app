<?php
header("Access-Control-Allow-Origin: *");// Permite acesso de qualquer origem
header("Content-Type: application/json");// formato enviado em json
header("Access-Control-Allow-Methods: GET");//  Método de requisição
header("Access-Control-Allow-Headers: Content-Type");// Tipo de cabeçalho aceito

include('../database/db.php'); // arquivo de configuração do banco de dados 

if (!isset($_GET['id'])) {// Verifica se o parâmetro 'id' foi fornecido
    echo json_encode([// Retorna uma mensagem de erro encode é para decoficar em json
        'success' => false,
        'message' => 'Parâmetro "id" não fornecido'
    ]);
    exit;
}

$id = $_GET['id'];// Recebe o valor do parâmetro 'id'

// Verifique se a conexão foi estabelecida corretamente
if (!$conn) {
    echo json_encode([
        'success' => false,
        'message' => 'Falha na conexão com o banco de dados'
    ]);
    exit;
}

// Consulta SQL - Alteração para usar 'cliente_id' e a tabela 'Clientes'
$sql = "SELECT nome, telefone, email , password FROM Clientes WHERE cliente_id = ?";
if ($stmt = $conn->prepare($sql)) {//verifica conexão
    $stmt->bind_param("i", $id);//verifica se o id é um inteiro
    $stmt->execute();//executa a consulta
    $stmt->store_result();

    if ($stmt->num_rows > 0) {//verifica se a consulta retornou algum resultado
        $stmt->bind_result($nome, $telefone, $email, $password);//atribui os valores retornados da consulta as variáveis
        $stmt->fetch();
        echo json_encode([//retorna os valores em json
            'success' => true,
            'user' => [
                'nome' => $nome,
                'telefone' => $telefone,
                'email' => $email,
            ]
        ]);
    } else {
        echo json_encode([//retorna uma mensagem de erro
            'success' => false,
            'message' => 'Cliente não encontrado'
        ]);
    }
    $stmt->close();//fecha a consulta
} else {
    echo json_encode([//retorna uma mensagem de erro
        'success' => false,
        'message' => 'Erro ao preparar a consulta'
    ]);
}

// Fechar a conexão
$conn->close();
?>
