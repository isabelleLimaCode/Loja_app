<?php

function sendWhatsAppMessage($phone, $message) {
    $url = "https://api.whapi.cloud/messages/text"; // Altere para a URL correta
    $apiKey = "SEU_BEARER_AUTH_KEY"; // Substitua pelo seu token real

    $data = [
        "to" => $phone,
        "body" => $message
    ];

    $headers = [
        "Authorization: Bearer $apiKey",
        "Content-Type: application/json"
    ];

    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_POST, 1);
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);

    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE); // Captura o código HTTP
    curl_close($ch);

    return json_encode(["http_code" => $httpCode, "response" => json_decode($response, true)]);
}

if ($_SERVER["REQUEST_METHOD"] === "GET") {
    $phone = $_GET["phone"] ?? "";
    $message = $_GET["message"] ?? "";

    if (!empty($phone) && !empty($message)) {
        echo sendWhatsAppMessage($phone, $message);
    } else {
        echo json_encode(["error" => "Número de telefone e mensagem são obrigatórios"]);
    }
}

?>
