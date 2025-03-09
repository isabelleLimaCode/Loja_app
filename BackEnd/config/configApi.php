<?php
require __DIR__ . '/../../vendor/autoload.php'; // carrega automaticamente as classes necessárias via Composer

use OpenAPI\Client\Model\SenderText;// Classe que representa o modelo de uma mensagem que será enviada.
use OpenAPI\Client\Api\MessagesApi;// Classe responsável por gerenciar as operações relacionadas ao envio de mensagens.
use OpenAPI\Client\Configuration;// Classe usada para configurar as opções de autenticação e outras configurações.
use GuzzleHttp\Client;// Classe da biblioteca Guzzle, que é uma ferramenta popular para fazer requisições HTTP em PHP.

$bearerToken = "rhiWorpikiOC4oBJ6mBsabGNNzRSHSaz"; //  chave de autenticação do tipo Bearer Token

$config = Configuration::getDefaultConfiguration()// criada uma instância de configuração padrão
    ->setAccessToken($bearerToken); //token de acesso ($bearerToken) é configurado para autenticação nas requisições.

$apiInstance = new MessagesApi(// Este objeto será usado para chamar os métodos que permitem o envio de mensagens.
    new Client(),//passada como o primeiro parâmetro, e a configuração criada
    $config// Passa a configuração
);
?>
