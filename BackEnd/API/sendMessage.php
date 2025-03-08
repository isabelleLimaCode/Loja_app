<?php
$apiKey = "4EZ7XWCd2QTP2PmL6wC3oZr2tuFH8jzt"; // Substitua pela sua API Key
$numero = "351910066962"; // Número de destino no formato internacional
$mensagem = "Olá, esta é uma mensagem de teste WHAPI Cloud!";

$url = "https://whapi.cloud/api/send-message"; // URL atualizada para WHAPI Cloud

$dados = [
    "phone" => $numero, // "phone" é o parâmetro usado pela nova API
    "message" => $mensagem
];

$ch = curl_init($url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    "Authorization: Bearer $apiKey",
    "Content-Type: application/json"
]);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($dados));

// Definir timeout para 10 segundos
curl_setopt($ch, CURLOPT_TIMEOUT, 10);

$resposta = curl_exec($ch);

if (curl_errno($ch)) {
    echo "Erro no cURL: " . curl_error($ch);
} else {
    // Decodificar a resposta JSON
    $respostaJson = json_decode($resposta, true);
    
    // Verificar se a resposta contém status de sucesso
    if (isset($respostaJson['status']) && $respostaJson['status'] == 'success') {
        echo "Mensagem enviada com sucesso!";
    } else {
        // Exibir erro caso haja algum problema
        echo "Erro ao enviar mensagem: " . ($respostaJson['message'] ?? 'Desconhecido');
    }
}

curl_close($ch);
?>
