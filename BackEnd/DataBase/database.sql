CREATE DATABASE IF NOT EXISTS loja;
USE loja;

-- Tabela Clientes
CREATE TABLE IF NOT EXISTS Clientes (
    cliente_id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    telefone VARCHAR(15),
    password VARCHAR(100),
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
INSERT INTO Clientes (nome, email, telefone, password, data_nascimento) VALUES 
('João Silva', 'joao@email.com', '912345678','1234nt', '1990-05-15'),
('Maria Santos', 'maria@email.com', '923456789','1234nt', '1985-10-20'),
('Carlos Pereira', 'carlos@email.com', '934567890','abcd1234', '1992-08-30'),
('Ana Oliveira', 'ana@email.com', '945678901','senha123', '1988-12-12'),
('Luís Costa', 'luis@email.com', '956789012','1234abcd', '1995-02-25');

INSERT INTO Produtos (nome_produto, descricao, preco, estoque) VALUES 
('Produto A', 'Descrição do Produto A', 50.00, 10),
('Produto B', 'Descrição do Produto B', 100.00, 5),
('Produto C', 'Descrição do Produto C', 150.00, 7),
('Produto D', 'Descrição do Produto D', 200.00, 3),
('Produto E', 'Descrição do Produto E', 75.00, 15);

INSERT INTO Subscricoes (cliente_id, produto_id, data_subscricao, status) VALUES 
(1, 1, '2024-03-08', 'Ativo'),
(2, 2, '2024-03-08', 'Pendente'),
(3, 3, '2024-03-09', 'Ativo'),
(4, 4, '2024-03-10', 'Cancelado'),
(5, 5, '2024-03-11', 'Ativo');
