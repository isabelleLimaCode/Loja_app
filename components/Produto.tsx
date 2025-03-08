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

// Definir o tipo Produto
type Produto = {
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

    useEffect(() => {
        const loadUserData = async () => {
            const storedUserId = await AsyncStorage.getItem('user_id');
            if (storedUserId) {
                setUserId(storedUserId);
                console.log('User ID recuperado:', storedUserId); // Debugging
            } else {
                console.error('User ID não encontrado no AsyncStorage');
            }
        };

        loadUserData();
    }, []);

    useEffect(() => {
        loadProduct();
        
        // Adicionar listener para recarregar os produtos quando voltar da tela de edição
        const unsubscribe = navigation.addListener('focus', loadProduct);
        
        return unsubscribe; // Limpar listener ao desmontar o componente
    }, [navigation]);

    // Função para buscar os produtos
    const loadProduct = async () => {
        setIsLoading(true);
        try {
            let response = await fetch(`http://172.20.10.3:8000/api/getProdutos.php`, {
                method: 'GET',
            });

            const contentType = response.headers.get('Content-Type');
            
            if (!contentType || !contentType.includes('application/json')) {
                const text = await response.text();
                console.error('Resposta inesperada do servidor:', text);
                throw new Error('Resposta não é JSON');
            }

            let data = await response.json();
            console.log('Resposta da API:', data);

            if (data.success && data.produtos) {
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

    

    // Função para subscrever ao produto
    const subscreverProduto = async (produto_id: number) => {
        if (!userId) {
            Alert.alert('Erro', 'Dados incompletos. Não foi possível obter o ID do utilizador.');
            return;
        }
    
        if (subscricoes.includes(produto_id)) {
            Alert.alert('Aviso', 'Já estás subscrito a este produto!');
            return;
        }
    
        const status = 'ativa';
        const data_subscricao = new Date().toISOString().split('T')[0]; // Formato correto para a data
    
        try {
            // Verifique os valores de userId, produto_id, data_subscricao e status antes de enviar
            console.log("userId", userId);
            console.log("produto_id", produto_id);
            console.log("data_subscricao", data_subscricao);
            console.log("status", status);
   
            // Tente enviar os dados como números
            const response = await fetch('http://172.20.10.3:8000/api/addSubscri.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId: Number(userId), // Garantir que seja um número
                    produto_id: Number(produto_id), // Garantir que seja um número
                    data_subscricao,
                    status,
                }),
            });
    
            const data = await response.json();
    
            console.log("Resposta da API:", data); // Log para depuração
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
        <View style={{ flex: 1, paddingTop: 50, backgroundColor: '#f5f5f5' }}>
            <Text style={{ fontSize: 22, fontWeight: 'bold', textAlign: 'center', marginBottom: 10, color: '#333' }}>
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
                                    disabled={subscricoes.includes(item.produto_id)}
                                    onPress={() => subscreverProduto(item.produto_id)}
                                >
                                    {subscricoes.includes(item.produto_id) ? 'Subscrito' : 'Subscrever'}
                                </Button>

                                <Button style={{ backgroundColor: '#e61919' }} mode="contained" onPress={() => console.log("Eliminou", item.nome_produto)}>
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
