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
    const [pass, setPass] = useState('');
    const [confirmarPass, setConfirmarPass] = useState('');
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
    
            // Verificar o tipo de conteúdo da resposta
            const contentType = response.headers.get('Content-Type');
            console.log('Tipo de conteúdo:', contentType);
    
            // Se o tipo de conteúdo não for JSON, exiba a resposta como texto
            if (!contentType || !contentType.includes('application/json')) {
                const text = await response.text();
                console.error('Resposta inesperada do servidor:', text);
                throw new Error('Resposta não é JSON');
            }
    
            let data = await response.json();
            console.log('Dados do perfil:', data);
    
            if (data.success && data.user) {
                const { nome, telefone, email ,password} = data.user;
                setNome(nome);
                setTelemovel(telefone);
                setEmail(email); // O email será atualizado se houver algum novo
                setPass(password);
                setConfirmarPass(password);
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
    

    // Verifica se o email contém "@" 
    const hasEmailError = () => {
        return !email.includes('@');
    };

    // se a senha e a confirmação são iguais
    const hasPasswordError = () => {
        return pass !== confirmarPass;
    };

    const onChangeNome = (text: string) => {
        setNome(text);
    };

    const onChangeEmail = (text: string) => {
        setEmail(text);
    };

    const onChangePass = (text: string) => {
        setPass(text);
    };

    const onChangeConfirmarPass = (text: string) => {
        setConfirmarPass(text);
    };

    const onChangeTelemovel = (text: string) => {
        setTelemovel(text);
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
            <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' , top:-20}}>
                <View>
                    <Image style={stylemain.imag3} source={require('../assets/images/user.png')} />
                    <Text style={stylemain.title}>Perfil</Text>
                    <TextInput 
                        style={{ marginBottom: 10 }} 
                        label="Nome" 
                        value={nome} 
                        onChangeText={onChangeNome} 
                    />
                    <TextInput 
                        label="Email" 
                        value={email} 
                        onChangeText={onChangeEmail} 
                    />
                    <HelperText type="error" visible={hasEmailError()}>
                        O endereço de email é inválido!
                    </HelperText>
                    <TextInput 
                        label="Password" 
                        secureTextEntry 
                        value={pass} 
                        onChangeText={onChangePass} 
                    />
                    <HelperText type="error" visible={hasPasswordError()}>
                        As senhas não coincidem!
                    </HelperText>
                    <TextInput 
                        style={{ marginBottom: 10 }} 
                        label="Confirmar Password" 
                        secureTextEntry 
                        value={confirmarPass} 
                        onChangeText={onChangeConfirmarPass} 
                    />
                    <TextInput 
                        style={{ marginBottom: 10 }} 
                        label="Telemóvel" 
                        value={telemovel} 
                        onChangeText={onChangeTelemovel} 
                    />
                </View>
                <Button style={{backgroundColor:'#B5C2B7', width:250,alignSelf:'center', marginTop:10}} mode="contained" onPress={() => console.log("Eliminou", "teste")}>
                    Atualizar Perfil
                </Button>
                <Button style={{backgroundColor:'#B5C2B7', width:250,alignSelf:'center', marginTop:8}} mode="contained" onPress={reset}>
                    Sair
                </Button>
            </ScrollView>
            
        </KeyboardAvoidingView>
    );
}
