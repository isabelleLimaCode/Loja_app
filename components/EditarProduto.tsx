import React, { useState } from 'react';
import { Text, View, Alert, KeyboardAvoidingView, ScrollView, Platform } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack'; // Importar para tipar as props corretamente
import { TextInput, Button } from 'react-native-paper';
import stylemain from '../Styles/StyleLogin'; // Estilos

// Definir o tipo Produto
type Produto = {
  produto_id: number;
  nome_produto: string;
  descricao: string;
  preco: number;
  estoque: number;
};

// Tipar as props corretamente com StackScreenProps
type RootStackParamList = {
  login: undefined;
  Main: undefined;
  test: undefined;
  EditarProduto: { produto: Produto };
};

type EditarProdutoProps = StackScreenProps<RootStackParamList, 'EditarProduto'>;

export default function EditarProduto({ navigation, route }: EditarProdutoProps) {
  const { produto } = route.params;

  // Estados para os campos do produto
  const [nome, setNome] = useState(produto.nome_produto || '');
  const [descricao, setDescricao] = useState(produto.descricao || '');
  const [preco, setPreco] = useState(produto.preco?.toString() || '');
  const [estoque, setEstoque] = useState(produto.estoque?.toString() || '');

  // Função para enviar os dados do produto atualizado para o servidor
  const handleUpdate = async () => {
    // Validar os campos (opcional)
    if (!nome || !descricao || !preco || !estoque) {
      Alert.alert('Erro', 'Todos os campos devem ser preenchidos!');
      return;
    }
  
    // Enviar os dados via requisição POST
    try {
      const response = await fetch('http://172.20.10.3:8000/api/updateproduto.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          produto_id: produto.produto_id,
          nome_produto: nome,
          descricao,
          preco: parseFloat(preco),
          estoque: parseInt(estoque),
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
