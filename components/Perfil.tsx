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

type RootStackParamList = {
    login: undefined;
    Main: undefined;
};

type Props = {
    navigation: StackNavigationProp<RootStackParamList, "login">;
};

export default function Perfil({ navigation }: Props) {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [telemovel, setTelemovel] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const [userId, setUserId] = useState<string | null>(null);
    const [userEmail, setUserEmail] = useState<string | null>(null);

    useEffect(() => {
        const loadUserData = async () => {
            const storedUserId = await AsyncStorage.getItem('user_id');
            const storedUserEmail = await AsyncStorage.getItem('user_email');
            if (storedUserId && storedUserEmail) {
                setUserId(storedUserId);
                setUserEmail(storedUserEmail);
                loadUserProfile(storedUserId);  // Carrega os dados do perfil
            }
        };

        loadUserData();
    }, []);

    // Função para buscar os dados do perfil
    const loadUserProfile = async (id: string) => {
        setIsLoading(true);
        try {
            let response = await fetch(`http://172.20.10.3:8000/api/user_profile.php?id=${id}`, {
                method: 'GET',
            });
    
            const contentType = response.headers.get('Content-Type');
    
            if (!contentType || !contentType.includes('application/json')) {
                const text = await response.text();
                console.error('Resposta inesperada do servidor:', text);
                throw new Error('Resposta não é JSON');
            }
    
            let data = await response.json();
    
            if (data.success && data.user) {
                const { nome, telefone, email } = data.user;
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
            const response = await fetch(`http://172.20.10.3:8000/api/updatePerfil.php`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: userId,
                    nome: nome,
                    email: email,
                    telefone: telemovel,
                }),
            });

            const data = await response.json();
            if (data.success) {
                Alert.alert('Sucesso', 'Perfil atualizado com sucesso');
                loadUserProfile(userId!); // Recarregar os dados do perfil após atualização
            } else {
                Alert.alert('Erro', data.message || 'Falha ao atualizar perfil');
            }
        } catch (err) {
            console.error('Erro ao atualizar perfil:', err);
            Alert.alert('Erro', 'Falha na conexão com o servidor');
        } finally {
            setIsLoading(false);
        }
    };

    const reset = () => {
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
            <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', top:-20 }}>
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
                    />
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
