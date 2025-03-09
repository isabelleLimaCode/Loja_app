<?php
header('Content-Type: application/json');// Para o navegador entender que é um JSON

// Carregar os autoloaders e configurações
require __DIR__ . '/../../vendor/autoload.php'; // Sobe duas pastas para aceder ao 'vendor/autoload.php'
require __DIR__ . '/../config/configApi.php'; // Sobe uma pasta para aceder ao 'config/configApi.php'

// Verificar parâmetros antes de chamar a função
if (!isset($_GET['phone']) || !isset($_GET['message'])) { // Se não existir o parâmetro 'phone' ou 'message'
    echo json_encode(['error' => 'Parâmetros inválidos! Use ?phone=NUMERO&message=TEXTO']); // Mostra a mensagem de erro
    exit; // Termina a execução
}
// Atribuir os parâmetros a variáveis
$phone = $_GET['phone'];
$message = $_GET['message'];

// Função para enviar mensagem no WhatsApp
function sendWhatsAppText($apiInstance, $to, $message) {// Recebe o objeto da API, o número de telefone e a mensagem
    $senderText = new \OpenAPI\Client\Model\SenderText();// Cria um objeto do tipo 'SenderText'
    $senderText->setTo($to);// define o numero de telefone
    $senderText->setBody($message);// define o corpo de mensagem o que vai ser enviado

    try {
        $result = $apiInstance->sendMessageText($senderText);// tenta enviar com o metodo 'sendMessageText' e guarda o resultado
        return ['success' => true, 'response' => $result];// Retorna um array com o sucesso e a resposta
    } catch (Exception $e) {// Se houver um erro
        return ['success' => false, 'error' => $e->getMessage()];
    }
}

try {
    // Tentativa de enviar a mensagem
    $response = sendWhatsAppText($apiInstance, $phone, $message);// Chama a função 'sendWhatsAppText' e guarda o resultado
    
    // Log do resultado da requisição para análise
    if ($response['success'] === true) { // Se a mensagem foi enviada com sucesso
        echo json_encode(['status' => 'Message sent successfully', 'response' => $response['response']]);
    } else {
        echo json_encode(['status' => 'Message failed', 'error' => $response['error']]);// Se houver um erro
    }
} catch (Exception $e) {
    // Log do erro global
    echo json_encode(['error' => 'Erro ao enviar mensagem: ' . $e->getMessage()]);
    exit;
}
?>
