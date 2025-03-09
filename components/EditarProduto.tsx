import React, { useState } from 'react';
import { Text, View, Alert, KeyboardAvoidingView, ScrollView, Platform } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack'; // Importar para tipar as props corretamente
import { TextInput, Button } from 'react-native-paper';
import stylemain from '../Styles/StyleLogin'; // Estilos
import { API_URL } from '../BackEnd/config/api_url';// Importar a URL da API

// Definir objeto para o Produto 
type Produto = {
  produto_id: number;
  nome_produto: string;
  descricao: string;
  preco: number;
  estoque: number;
};

// Tipar as props corretamente com StackScreenProps garanta que as propriedades corretas sejam passadas, evitando erros no momento da navegação.
type RootStackParamList = {
  login: undefined;
  Main: undefined;
  test: undefined;
  EditarProduto: { produto: Produto };
};

type EditarProdutoProps = StackScreenProps<RootStackParamList, 'EditarProduto'>;// pq essa tela ta espera de um parametro

export default function EditarProduto({ navigation, route }: EditarProdutoProps) { // recebe as variavies do parametro a cima
  const { produto } = route.params;// pega o produto que foi passado como parametro

  // Estados para os campos do produto
  const [nome, setNome] = useState(produto.nome_produto || '');//guarda o nome do produto senao guarda vazio
  const [descricao, setDescricao] = useState(produto.descricao || '');//guarda a descricao do produto senao guarda vazio
  const [preco, setPreco] = useState(produto.preco?.toString() || '');//guarda o preco do produto senao guarda vazio
  const [estoque, setEstoque] = useState(produto.estoque?.toString() || '');//guarda o estoque do produto senao guarda vazio

  // Função para enviar os dados do produto atualizado para o servidor
  const handleUpdate = async () => {
    // Validar os campos (opcional)
    if (!nome || !descricao || !preco || !estoque) {
      Alert.alert('Erro', 'Todos os campos devem ser preenchidos!');
      return;
    }
  
    // Enviar os dados via requisição POST
    try {
      const response = await fetch(`${API_URL}/api/updateproduto.php`, {//envia os dados para a api
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({//envia os dados em formato json
          produto_id: produto.produto_id,//envia o id do produto
          nome_produto: nome,
          descricao,
          preco: parseFloat(preco),//converte o preco para float
          estoque: parseInt(estoque),// converte o estoque para inteiro
        }),
      });
  
      // Usar apenas response.json() ou response.text()
      const data = await response.json(); // Alterei para apenas ler o JSON.
  
      if (data.success) {
        // Caso o produto seja atualizado com sucesso
        Alert.alert('Sucesso', 'Produto atualizado com sucesso!');
        navigation.goBack(); // Volta para a tela anterior
      } else {
        // Caso algo dê errado na atualização
        Alert.alert('Erro', data.message || 'Falha ao atualizar o produto');
      }
    } catch (error) {
      console.error('Erro ao atualizar produto:', error);
      Alert.alert('Erro', 'Falha na conexão com o servidor');
    }
  };
  

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1, justifyContent: 'center', padding: 20 }}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <Text style={stylemain.title}>Editar Produto</Text>

        <TextInput
          value={nome}
          onChangeText={setNome}
          style={{ marginBottom: 10 }}
          placeholder="Nome"
        />

        <TextInput
          value={descricao}
          onChangeText={setDescricao}
          style={{ marginBottom: 10 }}
          placeholder="Descrição"
        />

        <TextInput
          value={preco}
          onChangeText={setPreco}
          style={{ marginBottom: 10 }}
          placeholder="Preço"
          keyboardType="numeric"
        />

        <TextInput
          value={estoque}
          onChangeText={setEstoque}
          style={{ marginBottom: 10 }}
          placeholder="Estoque"
          keyboardType="numeric"
        />

        <Button
          style={{ backgroundColor: '#B5C2B7', width: 250, alignSelf: 'center', marginTop: 8 }}
          onPress={handleUpdate}
        >
          Atualizar Produto
        </Button>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
