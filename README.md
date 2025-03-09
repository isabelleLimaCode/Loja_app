# Guia de Instalação e Execução

## Aplicações Necessárias

- **Expo**: Para rodar a aplicação Expo.
- **Composer**: Para gerenciar dependências PHP.
- **XAMPP**: Para PHP e MySQL.
- **Visual Studio Code**: Para abrir e rodar a aplicação com NPM.

---

## Vídeo da Aplicação

Confira o vídeo abaixo para ver a aplicação em funcionamento:

[Assista ao vídeo aqui](https://firebasestorage.googleapis.com/v0/b/stock-easy-7eced.appspot.com/o/WhatsApp%20Video%202025-03-09%20at%2015.52.15.mp4?alt=media&token=31ef38ac-d6b8-445a-9dbe-a6f3c8a9a19a)

---

## Passos para o Programa Funcionar

### 1. Baixar o Repositório
Abra o repositório no **Visual Studio Code**.

### 2. Alterar o Ficheiro de Configuração
Abra o arquivo `api_url.tsx` localizado em:

c:\LojaApp__\loja\BackEnd\config\api_url.tsx

Substitua o IP atual pelo IP da sua máquina (Wireless LAN adapter Wi-Fi).

### 3. Iniciar o MySQL e Apache
Abra o **XAMPP** e inicie os serviços **MySQL** e **Apache**.

### 4. Criar a Base de Dados
Abra o **CMD** (não use o PowerShell) e navegue até a pasta do banco de dados:

cd c:\LojaApp__\loja\BackEnd\DataBase

Execute o seguinte comando para criar a base de dados:
php setup.php

### 5. Iniciar o Servidor PHP
No **CMD**, navegue até a pasta do servidor PHP:

cd C:\Users\isabe\LojaApp__\Loja
Execute o comando para iniciar o servidor PHP:
php -S 0.0.0.0:8000 -t backend

### 6. Iniciar a Aplicação no Visual Studio Code
No **Visual Studio Code**, abra a pasta do projeto:

C:\Users\isabe\LojaApp__\Loja
Execute os seguintes comandos:
1. Instalar as dependências do projeto:
    ```
    npm install
    ```
2. Iniciar o projeto:
    ```
    npm start
    ```

---

## Credenciais de Acesso

- **Email**: tiago@gmail.com
- **Senha**: teste

> **Nota**: O usuário já está configurado para a autenticação de dois fatores com o seu número de telemóvel.
