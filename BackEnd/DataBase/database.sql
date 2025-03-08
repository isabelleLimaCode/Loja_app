CREATE DATABASE IF NOT EXISTS Loja;
USE Loja;

-- Tabela Clientes
CREATE TABLE IF NOT EXISTS Clientes (
    cliente_id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    telefone VARCHAR(15),
    data_nascimento DATE
);

-- Tabela Produtos
CREATE TABLE IF NOT EXISTS Produtos (
    produto_id INT AUTO_INCREMENT PRIMARY KEY,
    nome_produto VARCHAR(100) NOT NULL,
    descricao TEXT,
    preco DECIMAL(10, 2) NOT NULL,
    estoque INT NOT NULL
);

-- Tabela Subscrições
CREATE TABLE IF NOT EXISTS Subscricoes (
    subscricao_id INT AUTO_INCREMENT PRIMARY KEY,
    cliente_id INT,
    produto_id INT,
    data_subscricao DATE NOT NULL,
    status VARCHAR(20) NOT NULL,
    FOREIGN KEY (cliente_id) REFERENCES Clientes(cliente_id),
    FOREIGN KEY (produto_id) REFERENCES Produtos(produto_id)
);

-- Inserir dados iniciais
INSERT INTO Clientes (nome, email, telefone, data_nascimento) VALUES 
('João Silva', 'joao@email.com', '912345678', '1990-05-15'),
('Maria Santos', 'maria@email.com', '923456789', '1985-10-20');

INSERT INTO Produtos (nome_produto, descricao, preco, estoque) VALUES 
('Produto A', 'Descrição do Produto A', 50.00, 10),
('Produto B', 'Descrição do Produto B', 100.00, 5);

INSERT INTO Subscricoes (cliente_id, produto_id, data_subscricao, status) VALUES 
(1, 1, '2024-03-08', 'Ativo'),
(2, 2, '2024-03-08', 'Pendente');
