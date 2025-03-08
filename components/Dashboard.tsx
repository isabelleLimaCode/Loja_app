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
    const [produtos, setProdutos] = useState<Produto[]>([]); // Definir o tipo como um array de Produtos

    useEffect(() => {
        loadProduct();
    }, []);

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

    return (
        <View style={{ flex: 1, paddingTop: 50, backgroundColor: '#f5f5f5' }}>
            <Text style={{ fontSize: 22, fontWeight: 'bold', textAlign: 'center', marginBottom: 10, color: '#333' }}>Produtos</Text>
            
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
                                <Paragraph style={{ fontSize: 16, color: "green", marginBottom: 5 }}>€{item.preco}</Paragraph>
                            </Card.Content>
                            <Card.Actions>
                                <Button style={{ backgroundColor: '#62466B' }} mode="contained" onPress={() => navigation.navigate('EditarProduto', { produto: item })}>
                                    Editar
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
