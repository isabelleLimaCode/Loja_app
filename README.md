<!DOCTYPE html>
<html lang="pt">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Guia de Configuração</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 40px;
            background-color: #f4f4f4;
            color: #333;
        }
        h1 {
            color: #2c3e50;
            text-align: center;
        }
        h2 {
            color: #34495e;
        }
        code {
            background-color: #ecf0f1;
            padding: 5px;
            border-radius: 5px;
            font-family: Consolas, monospace;
        }
        pre {
            background-color: #ecf0f1;
            padding: 10px;
            border-radius: 5px;
            overflow-x: auto;
            font-family: Consolas, monospace;
            line-height: 1.5;
        }
        .container {
            max-width: 800px;
            margin: auto;
            background: white;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
        }
        p {
            font-size: 1.1em;
            line-height: 1.6;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Guia de Configuração do Projeto</h1>
        
        <h2>1. Alterar o Ficheiro de Configuração</h2>
        <p>Abre o seguinte ficheiro:</p>
        <pre>c:\LojaApp__\loja\BackEnd\config\api_url.tsx</pre>
        <p>Substitui o IP atual pelo <strong>teu IP da máquina</strong> (Wireless LAN adapter Wi-Fi).</p>
        
        <h2>2. Criar a Base de Dados</h2>
        <p>Certifica-te de que tens o <strong>XAMPP instalado</strong> com PHP e MySQL.</p>
        <p>Abre o CMD e executa os seguintes comandos:</p>
        <pre>
cd c:\LojaApp__\loja\BackEnd\DataBase
php setup.php
        </pre>
        
        <h2>3. Iniciar o Servidor PHP</h2>
        <p>Não feches o CMD!</p>
        <p>Abre outro CMD e navega até a pasta do projeto:</p>
        <pre>
cd c:\LojaApp__\loja
        </pre>
        <p>Executa o comando para iniciar a conexão PHP com a base de dados:</p>
        <pre>
php -S 0.0.0.0:8000 -t backend
        </pre>
        <p>Após esses passos, a API estará em funcionamento!</p>
    </div>
</body>
</html>
