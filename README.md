<!DOCTYPE html>
<html lang="pt">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Guia de Configuração</title>
</head>
<body>
    <div>
        <h1>Guia de Configuração do Projeto</h1>
        
        1. Alterar o Ficheiro de Configuração
        Abra o seguinte ficheiro:
        c:\LojaApp__\loja\BackEnd\config\api_url.tsx
        Substitua o IP atual pelo <strong>teu IP da máquina</strong> (Wireless LAN adapter Wi-Fi).
        
        2. Criar a Base de Dados
        Certifique-se de que tem o <strong>XAMPP instalado</strong> com PHP e MySQL.
        Abra o CMD e execute os seguintes comandos:
        <pre>
cd c:\LojaApp__\loja\BackEnd\DataBase
php setup.php
        </pre>
        
        <h2>3. Iniciar o Servidor PHP</h2>
        <p>Não feche o CMD!</p>
        <p>Abra outro CMD e navegue até a pasta do projeto:</p>
        <pre>
cd c:\LojaApp__\loja
        </pre>
        <p>Execute o comando para iniciar a conexão PHP com a base de dados:</p>
        <pre>
php -S 0.0.0.0:8000 -t backend
        </pre>
        <p>Após esses passos, a API estará em funcionamento!</p>
    </div>
</body>
</html>
