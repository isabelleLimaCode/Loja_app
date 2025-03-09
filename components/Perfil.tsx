import React, { useState, useEffect } from 'react'; 
import { 
    Text, 
    View,
    Image,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    ActivityIndicator,
    Alert
} from 'react-native';
import { StackNavigationProp } from "@react-navigation/stack";
import { HelperText, TextInput, Button } from 'react-native-paper';
import stylemain from '../Styles/StyleLogin';
import { CommonActions } from '@react-navigation/native'; 
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '../BackEnd/config/api_url';

type RootStackParamList = {
    login: undefined;
    Main: undefined;
};

type Props = {
    navigation: StackNavigationProp<RootStackParamList, "login">;// receber parametros da navegação
};

export default function Perfil({ navigation }: Props) {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [telemovel, setTelemovel] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const [userId, setUserId] = useState<string | null>(null); // ID do utilizador passado por parametro
    const [userEmail, setUserEmail] = useState<string | null>(null);// Email do utilizador passado por parametro

    useEffect(() => {// é utilizado o useeffect para carregar ao iniciar a página
        const loadUserData = async () => {
            const storedUserId = await AsyncStorage.getItem('user_id'); // Buscar o ID do utilizador
            const storedUserEmail = await AsyncStorage.getItem('user_email');// Buscar o email do utilizador
            if (storedUserId && storedUserEmail) {// Se o ID e o email do utilizador existirem
                setUserId(storedUserId);// Guardar o ID do utilizador
                setUserEmail(storedUserEmail);// Guardar o email do utilizador
                loadUserProfile(storedUserId);  // Carrega os dados do perfil
            }
        };

        loadUserData();
    }, []);

    // Função para buscar os dados do perfil
    const loadUserProfile = async (id: string) => {
        console.log('Carregando perfil do utilizador:', id);
        setIsLoading(true);// Mostrar o spinner de carregamento
        try {
            let response = await fetch(`${API_URL}/api/user_profile.php?id=${id}`, {// Buscar os dados do perfil do utilizador
                method: 'GET',// Método GET
            });
    
            const contentType = response.headers.get('Content-Type');// Buscar o tipo de conteúdo da resposta
    
            if (!contentType || !contentType.includes('application/json')) {// Se a resposta não for JSON
                const text = await response.text();// Buscar o texto da resposta
                console.error('Resposta inesperada do servidor:', text);// Mostrar o erro no console
                throw new Error('Resposta não é JSON');// Lançar um erro
            }
    
            let data = await response.json();// Buscar os dados da resposta
    
            if (data.success && data.user) {// Se a resposta for bem sucedida e existir um utilizador
                const { nome, telefone, email } = data.user;// Buscar os dados do utilizador
                setNome(nome);
                setTelemovel(telefone);
                setEmail(email);
            } else {
                Alert.alert('Erro', data.message || 'Erro ao carregar os dados do perfil');
            }
        } catch (err) {
            console.error('Erro ao buscar perfil:', err);
            Alert.alert('Erro', 'Falha na conexão com o servidor');
        } finally {
            setIsLoading(false);
        }
    };

    // Função para atualizar os dados do perfil
    const updateProfile = async () => {
        if (!nome || !email || !telemovel) {
            Alert.alert('Erro', 'Por favor, preencha todos os campos');
            return;
        }

        setIsLoading(true);
        try {
            const response = await fetch(`${API_URL}/api/updatePerfil.php`, {// Atualizar os dados do perfil
                method: 'POST',// enviar dados para api
                headers: {
                    'Content-Type': 'application/json', // Tipo de conteúdo JSON
                },
                body: JSON.stringify({//transformando um objeto JavaScript em uma string JSON.
                    id: userId,
                    nome: nome,
                    email: email,
                    telefone: telemovel,
                }),
            });

            const data = await response.json();// Buscar os dados da resposta
            if (data.success) {// Se a resposta for bem sucedida
                Alert.alert('Sucesso', 'Perfil atualizado com sucesso');// Mostrar mensagem de sucesso
                loadUserProfile(userId!); // Recarregar os dados do perfil após atualização
            } else {
                Alert.alert('Erro', data.message || 'Falha ao atualizar perfil'); // Mostrar mensagem de erro
            }
        } catch (err) {
            console.error('Erro ao atualizar perfil:', err);
            Alert.alert('Erro', 'Falha na conexão com o servidor');
        } finally {
            setIsLoading(false);
        }
    };

    const reset = () => {// zera a pilha da stack
        setTimeout(() => {
            navigation.dispatch(
                CommonActions.reset({
                    index: 0,
                    routes: [{ name: 'login' }]
                })
            );
        }, 1000);
    };

    return (
        <KeyboardAvoidingView 
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
            style={{ flex: 1 }}>
            <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center',top:-50 }}>
                <View>
                    <Image style={stylemain.imag3} source={require('../assets/images/user.png')} />
                    <Text style={stylemain.title}>Perfil</Text>
                    <TextInput 
                        style={{ marginBottom: 27 }} 
                        label="Nome" 
                        value={nome} 
                        onChangeText={setNome} 
                    />
                    <TextInput 
                        style={{  }}
                        label="Email" 
                        value={email} 
                        onChangeText={setEmail} 
                    />{/* isso é uma mensagem de erro se o email não for valido */}
                    <HelperText type="error" visible={!email.includes('@')}>
                        O endereço de email é inválido!
                    </HelperText>
                    <TextInput 
                        style={{ marginBottom: 10, marginTop: 1 }} 
                        label="Telemóvel" 
                        value={telemovel} 
                        onChangeText={setTelemovel} 
                    />
                </View>
                <Button 
                    style={{ backgroundColor: '#B5C2B7', width: 250, alignSelf: 'center', marginTop: 10 }} 
                    mode="contained" 
                    onPress={updateProfile}>
                    Atualizar Perfil
                </Button>
                <Button 
                    style={{ backgroundColor: '#B5C2B7', width: 250, alignSelf: 'center', marginTop: 8 }} 
                    mode="contained" 
                    onPress={reset}>
                    Sair
                </Button>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}
