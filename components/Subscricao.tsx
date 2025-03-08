import React, { useState, useEffect } from 'react'; 
import { 
    Text, 
    View,
    FlatList,
    ActivityIndicator,
    Alert,
    Image
} from 'react-native'; 
import { Card, Title, Paragraph, Button } from 'react-native-paper'; 
import { useNavigation } from '@react-navigation/native'; 
import { StackNavigationProp } from '@react-navigation/stack'; 
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '../BackEnd/config/api_url';

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
    EditarProduto: { produto: Produto }; 
};

export default function Subscricao() {
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
    const [isLoading, setIsLoading] = useState(false);
    const [produtos, setProdutos] = useState<Produto[]>([]);
    const [userId, setUserId] = useState<string | null>(null);
    const [alertShown, setAlertShown] = useState(false);  // Controla se o alerta foi mostrado

    useEffect(() => {
        const loadUserData = async () => {
            try {
                const storedUserId = await AsyncStorage.getItem('user_id');
                console.log('User ID recuperado:', storedUserId); // Debugging
    
                if (storedUserId) {
                    setUserId(storedUserId);
                    loadProduct(storedUserId);
                } else {
                    Alert.alert('Erro', 'Utilizador não encontrado. Faça login novamente.');
                }
            } catch (error) {
                console.error('Erro ao carregar User ID:', error);
            }
        };
    
        loadUserData();
    
        // Atualiza quando a tela ganha foco
        const unsubscribe = navigation.addListener('focus', loadUserData);
        return unsubscribe;
    }, [navigation]);

    // Função para buscar os produtos subscritos pelo utilizador logado
    const loadProduct = async (id: string) => {
        if (!id) {
            console.error('Erro: ID do usuário é inválido.');
            return;
        }
    
        setIsLoading(true);
        try {
            const url = `${API_URL}/api/getSubscricoes.php?cliente_id=${id}`;
            console.log('Buscando produtos em:', url);
    
            let response = await fetch(url, { method: 'GET' });
    
            const contentType = response.headers.get('Content-Type');
            if (!contentType || !contentType.includes('application/json')) {
                const text = await response.text();
                console.error('Resposta inesperada do servidor:', text);
                throw new Error('Resposta não é JSON');
            }
    
            let data = await response.json();
            console.log('Resposta da API:', data);
    
            if (data.success && Array.isArray(data.produtos)) {
                setProdutos(data.produtos);
                // Verifica se não há produtos e alerta o usuário apenas uma vez
                if (data.produtos.length === 0 && !alertShown) {
                    //Alert.alert('Informação', 'Não há produtos subscritos.');
                    setAlertShown(true);  // Evita alertas múltiplos
                }
            } else {
                Alert.alert('Erro', data.message || 'Erro ao carregar produtos.');
            }
        } catch (err) {
            console.error('Erro ao buscar produtos:', err);
            Alert.alert('Erro', 'Falha na conexão com o servidor.');
        } finally {
            setIsLoading(false);
        }
    };

    // Função para remover a subscrição do produto
    const removeSubscricao = async (produto_id: number) => {
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
                loadProduct(userId);  // Atualiza a lista de produtos subscritos
            } else {
                Alert.alert('Erro', data.message || 'Erro ao remover subscrição');
            }
        } catch (error) {
            console.error('Erro ao remover subscrição:', error);
            Alert.alert('Erro', 'Falha na conexão com o servidor');
        }
    };

    return (
        <View style={{ flex: 1, paddingTop: 10, backgroundColor: '#f5f5f5' }}>
            <Text style={{ fontSize: 22, fontWeight: 'bold', textAlign: 'center', marginBottom: 10, color: '#333' }}>
                Produtos Subscritos
            </Text>
            
            {isLoading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : produtos.length === 0 ? (
                <View>
                <Image style={{
                              width: 350,
                              height: 350,
                              borderRadius: 20,
                              marginHorizontal: 20,
                            }} source={require('../assets/images/NoData.png')} />
                <Text style={{ textAlign: 'center', fontSize: 18, color: '#888' }}>
                    Não há produtos subscritos.
                </Text>
                </View>

            ) : (
                <FlatList
                    data={produtos}
                    keyExtractor={(item, index) => `${item.produto_id}-${index}`}// gera uma chave excluisva para cada item porque o id é sempre o mesmo
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
                                <Button style={{ backgroundColor: '#e61919' }} mode="contained" onPress={() => removeSubscricao(item.produto_id)}>
                                    Remover
                                </Button>
                            </Card.Actions>
                        </Card>
                    )}
                />
            )}
        </View>
    );
}
