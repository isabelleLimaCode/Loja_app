<?php
header('Content-Type: application/json');

// Carregar os autoloaders e configurações
require __DIR__ . '/../../vendor/autoload.php'; // Sobe duas pastas para aceder ao 'vendor/autoload.php'
require __DIR__ . '/../config/configApi.php';

// Verificar parâmetros antes de chamar a função
if (!isset($_GET['phone']) || !isset($_GET['message'])) {
    echo json_encode(['error' => 'Parâmetros inválidos! Use ?phone=NUMERO&message=TEXTO']);
    exit;
}

$phone = $_GET['phone'];
$message = $_GET['message'];

// Função para enviar mensagem no WhatsApp
function sendWhatsAppText($apiInstance, $to, $message) {
    $senderText = new \OpenAPI\Client\Model\SenderText();
    $senderText->setTo($to);
    $senderText->setBody($message);

    try {
        $result = $apiInstance->sendMessageText($senderText);
        return ['success' => true, 'response' => $result];
    } catch (Exception $e) {
        return ['success' => false, 'error' => $e->getMessage()];
    }
}

try {
    // Tentativa de enviar a mensagem
    $response = sendWhatsAppText($apiInstance, $phone, $message);
    
    // Log do resultado da requisição para análise
    if ($response['success'] === true) {
        echo json_encode(['status' => 'Message sent successfully', 'response' => $response['response']]);
    } else {
        echo json_encode(['status' => 'Message failed', 'error' => $response['error']]);
    }
} catch (Exception $e) {
    // Log do erro global
    echo json_encode(['error' => 'Erro ao enviar mensagem: ' . $e->getMessage()]);
    exit;
}
?>
