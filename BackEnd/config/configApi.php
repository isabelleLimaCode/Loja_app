<?php
require __DIR__ . '/../../vendor/autoload.php'; // Garante que o autoload do Composer é carregado

use OpenAPI\Client\Model\SenderText;
use OpenAPI\Client\Api\MessagesApi;
use OpenAPI\Client\Configuration;
use GuzzleHttp\Client;

$bearerToken = "rhiWorpikiOC4oBJ6mBsabGNNzRSHSaz"; // Substitui pelo teu token Bearer real

$config = Configuration::getDefaultConfiguration()
    ->setAccessToken($bearerToken); // A chave para autenticação

$apiInstance = new MessagesApi(
    new Client(),
    $config
);
?>
