import React, { useState, useEffect } from 'react'; 
import { 
    Text, 
    View,
    FlatList,
    ActivityIndicator,
    Alert
} from 'react-native'; 
import { Card, Title, Paragraph, Button } from 'react-native-paper'; 
import { useNavigation } from '@react-navigation/native'; // Hook para navegação
import { StackNavigationProp } from '@react-navigation/stack'; // Importando o tipo correto
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '../BackEnd/config/api_url';
// Definir o tipo Produto 
type Produto = {
    subscricao_id: number;
    produto_id: number;
    nome_produto: string;
    descricao: string;
    preco: number;
    estoque: number;
};

// Definir os tipos da navegação
type RootStackParamList = {
    EditarProduto: { produto: Produto };  // Definir o parâmetro que será passado
};

export default function Dashboard() {
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>(); // Tipar a navegação corretamente
    const [isLoading, setIsLoading] = useState(false);
    const [userId, setUserId] = useState<string | null>(null);
    const [produtos, setProdutos] = useState<Produto[]>([]); // Definir o tipo como um array de Produtos
    const [subscricoes, setSubscricoes] = useState<number[]>([]); // verificar se o produto está subscrito
    const [isUserLoaded, setIsUserLoaded] = useState(false);

    useEffect(() => {
        const loadUserData = async () => {
            const storedUserId = await AsyncStorage.getItem('user_id');// Buscar o ID do utilizador no AsyncStorage
            if (storedUserId) {
                setUserId(storedUserId);// Guardar o ID do utilizador
                console.log('User ID recuperado:', storedUserId);
            } else {
                console.error('User ID não encontrado no AsyncStorage');
            }
            setIsUserLoaded(true); // Marcar que o userId foi carregado
        };
    
        loadUserData();
    }, []);

    useEffect(() => {
        loadProduct();
        
        // recarregar os produtos quando voltar da tela de edição
        const unsubscribe = navigation.addListener('focus', loadProduct);
        
        return unsubscribe; // limpa o componente
    }, [navigation]);

    // Função para buscar os produtos
    const loadProduct = async () => {
        setIsLoading(true);
        try {
            let response = await fetch(`${API_URL}/api/getProdutos.php`, {// enpoint para buscar os produtos
                method: 'GET',
            });

            const contentType = response.headers.get('Content-Type');// Buscar o tipo de conteúdo da resposta
            
            if (!contentType || !contentType.includes('application/json')) {// Se a resposta não for JSON
                const text = await response.text();
                console.error('Resposta inesperada do servidor:', text);
                throw new Error('Resposta não é JSON');
            }

            let data = await response.json();// Buscar os dados da resposta
            console.log('Resposta da API:', data);

            if (data.success && data.produtos) {// Se a resposta for bem sucedida e existirem produtos
                setProdutos(data.produtos); // Atualiza a lista de produtos
            } else {
                Alert.alert('Erro', data.message || 'Erro ao carregar os produtos');
            }
        } catch (err) {
            console.error('Erro ao buscar os produtos:', err);
            Alert.alert('Erro', 'Falha na conexão com o servidor');
        } finally {
            setIsLoading(false);
        }
    };

    const removerSubscricao = async (produto_id: number) => {
        if (!userId) {
            Alert.alert('Erro', 'ID do usuário não encontrado');
            return;
        }
    
        try {
            const response = await fetch(`${API_URL}/api/deleteSubscri.php`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    cliente_id: userId,
                    produto_id: produto_id,
                }),
            });
    
            const data = await response.json();
            if (data.success) {
                Alert.alert('Sucesso', 'Subscrição removida com sucesso');
                loadProduct();  // Atualiza a lista de produtos
            } else {
                Alert.alert('Erro', data.message || 'Erro ao remover subscrição');
            }
        } catch (error) {
            console.error('Erro ao remover subscrição:', error);
            Alert.alert('Erro', 'Falha na conexão com o servidor');
        }
    };
    


    const excluirProduto = async (produto_id: number) => {
    if (!userId) {
        Alert.alert('Erro', 'ID do usuário não encontrado');
        return;
    }

    try {
        const response = await fetch(`${API_URL}/api/deleteProduto.php`, { // Atualize o URL do endpoint conforme necessário
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                produto_id: produto_id, // Passa o produto_id para o servidor
            }),
        });

        const data = await response.json();
        if (data.success) {
            Alert.alert('Sucesso', 'Produto excluído com sucesso');
            loadProduct();  // Atualiza a lista de produtos
        } else {
            Alert.alert('Erro', data.message || 'Erro ao excluir o produto');
        }
    } catch (error) {
        console.error('Erro ao excluir o produto:', error);
        Alert.alert('Erro', 'Falha na conexão com o servidor');
    }
};
    

    // Função para subscrever ao produto
    const subscreverProduto = async (produto_id: number) => {
        if (!userId) {// Verificar se o userId está definido
            console.log('userId não está definido:', userId);
            Alert.alert('Erro', 'Dados incompletos. Não foi possível obter o ID do utilizador.');
            return;
        }
    
        const status = 'ativa';
        const data_subscricao = new Date().toISOString().split('T')[0]; // Formato correto para a data
    
        try {
            console.log("userId", userId); // Verificar se o userId está presente
            console.log("produto_id", produto_id);
            console.log("data_subscricao", data_subscricao);
            console.log("status", status);
    
            const response = await fetch(`${API_URL}/api/addSubscri.php?id=${userId}`, {// endpoint para adicionar a subscrição
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    cliente_id: userId, 
                    produto_id,
                    data_subscricao,
                    status,
                }),
            });
    
            const data = await response.json();
    
            if (data.success) {
                Alert.alert('Sucesso', 'Subscrição realizada com sucesso!');
                loadProduct(); // Atualiza os produtos e subscrições
            } else {
                Alert.alert('Erro', data.message || 'Erro ao realizar subscrição');
            }
        } catch (error) {
            console.error('Erro ao subscrever produto:', error);
            Alert.alert('Erro', 'Falha na conexão com o servidor');
        }
    };
    
    

    return (
        <View style={{ flex: 1, paddingTop: 10, backgroundColor: '#f5f5f5' }}>
            <Text style={{ fontSize: 22, fontWeight: 'bold', textAlign: 'center', color: '#333' }}>
                Produtos
            </Text>
            
            {isLoading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : (
                <FlatList
                    data={produtos}
                    keyExtractor={(item) => item.produto_id.toString()}
                    renderItem={({ item }) => (
                        <Card style={{ margin: 10, borderRadius: 10, overflow: "hidden", elevation: 4 }}>
                            <Card.Cover source={require('../assets/images/venda2.png')} style={{ height: 150 }} />
                            <Card.Content>
                                <Title style={{ fontSize: 18, fontWeight: "bold" }}>{item.nome_produto}</Title>
                                <Paragraph style={{ fontSize: 16, color: "green", marginBottom: 5 }}>
                                    €{item.preco}
                                </Paragraph>
                            </Card.Content>
                            <Card.Actions>
                                <Button style={{ backgroundColor: '#62466B' }} mode="contained" onPress={() => navigation.navigate('EditarProduto', { produto: item })}>
                                    Editar
                                </Button>
                                <Button
                                    style={{ backgroundColor: subscricoes.includes(item.produto_id) ? '#ccc' : '#62466B' }}
                                    mode="contained"
                                    disabled={subscricoes.includes(item.produto_id) || !isUserLoaded}
                                    onPress={() => subscreverProduto(item.produto_id)}
                                >
                                    {subscricoes.includes(item.produto_id) ? 'Subscrito' : 'Subscrever'}
                                </Button>

                                <Button 
                                    style={{ backgroundColor: '#e61919' }} 
                                    mode="contained" 
                                    onPress={() => excluirProduto(item.produto_id)}  // Chama a função de exclusão
                                >
                                    Eliminar
                                </Button>

                            </Card.Actions>
                        </Card>
                    )}
                />
            )}
        </View>
    );
}
