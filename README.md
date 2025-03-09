<!DOCTYPE html>
<html lang="pt">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Guia de Instalação e Execução</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            margin: 20px;
            background-color: #f4f4f4;
            color: #333;
        }
        h1, h2 {
            color: #333;
        }
        ul {
            margin-bottom: 20px;
        }
        pre {
            background-color: #333;
            color: #fff;
            padding: 10px;
            border-radius: 5px;
            font-size: 1rem;
            overflow-x: auto;
        }
        .step {
            margin-bottom: 20px;
        }
        .note {
            background-color: #ffffcc;
            padding: 10px;
            border-left: 5px solid #ffcc00;
            margin-bottom: 20px;
        }
        .command {
            color: #d14;
        }
    </style>
</head>
<body>
    <h1>Guia de Instalação e Execução</h1>
    
    <h2>Aplicações Necessárias</h2>
    <ul>
        <li><strong>Expo</strong>: Para rodar a aplicação Expo.</li>
        <li><strong>Composer</strong>: Para gerenciar dependências PHP.</li>
        <li><strong>XAMPP</strong>: Para PHP e MySQL.</li>
        <li><strong>Visual Studio Code</strong>: Para abrir e rodar a aplicação com NPM.</li>
    </ul>

    <h2>Passos para o Programa Funcionar</h2>

    <div class="step">
        <h3>1. Baixar o Repositório</h3>
        <p>Abra o repositório no <strong>Visual Studio Code</strong>.</p>
    </div>

    <div class="step">
        <h3>2. Alterar o Ficheiro de Configuração</h3>
        <p>Abra o arquivo <code>api_url.tsx</code> localizado em:</p>
        <pre>c:\LojaApp__\loja\BackEnd\config\api_url.tsx</pre>
        <p>Substitua o IP atual pelo IP da sua máquina (Wireless LAN adapter Wi-Fi).</p>
    </div>

    <div class="step">
        <h3>3. Iniciar o MySQL e Apache</h3>
        <p>Abra o <strong>XAMPP</strong> e inicie os serviços <strong>MySQL</strong> e <strong>Apache</strong>.</p>
    </div>

    <div class="step">
        <h3>4. Criar a Base de Dados</h3>
        <p>Abra o <strong>CMD</strong> (não use o PowerShell) e navegue até a pasta do banco de dados:</p>
        <pre>cd c:\LojaApp__\loja\BackEnd\DataBase</pre>
        <p>Execute o seguinte comando para criar a base de dados:</p>
        <pre class="command">php setup.php</pre>
    </div>

    <div class="step">
        <h3>5. Iniciar o Servidor PHP</h3>
        <p>No <strong>CMD</strong>, navegue até a pasta do servidor PHP:</p>
        <pre>cd C:\Users\isabe\LojaApp__\Loja</pre>
        <p>Execute o comando para iniciar o servidor PHP:</p>
        <pre class="command">php -S 0.0.0.0:8000 -t backend</pre>
    </div>

    <div class="step">
        <h3>6. Iniciar a Aplicação no Visual Studio Code</h3>
        <p>No <strong>Visual Studio Code</strong>, abra a pasta do projeto:</p>
        <pre>C:\Users\isabe\LojaApp__\Loja</pre>
        <p>Execute os seguintes comandos:</p>
        <ul>
            <li>Instalar as dependências do projeto:</li>
            <pre class="command">npm install</pre>
            <li>Iniciar o projeto:</li>
            <pre class="command">npm start</pre>
        </ul>
    </div>

    <div class="note">
        <h3>Credenciais de Acesso</h3>
        <p><strong>Email</strong>: tiago@gmail.com</p>
        <p><strong>Senha</strong>: teste</p>
        <p><em>Nota:</em> O usuário já está configurado para a autenticação de dois fatores com o seu número de telemóvel.</p>
    </div>
</body>
</html>
