import React, { useEffect, useState } from 'react';
import { 
    Text, 
    TouchableOpacity, 
    View,
    Image,
    TextInput,
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    ActivityIndicator,
    Alert
} from 'react-native';
import stylemain from '../Styles/StyleLogin';
import { FontAwesome5, AntDesign } from '@expo/vector-icons';
import { StackNavigationProp } from "@react-navigation/stack";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '../BackEnd/config/api_url';
type RootStackParamList = {
    login: undefined;
    Main: undefined;
    aut: undefined;
};

type Props = {
    navigation: StackNavigationProp<RootStackParamList, "login">;//receber parametros de navegação
};

export default function Login({ navigation }: Props) {
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [telefone, setTelefone] = useState('');

    const handleLogin = async () => {
        console.log('Iniciando login...');// log de verificação
        setIsLoading(true);// isLoading passa a true para mostrar o ActivityIndicator
        try {
            console.log('Fazendo requisição para a API...');// log de verificação
            let response = await fetch(`${API_URL}/api/login.php`, {//fazendo requisição para a API
                method: 'POST',//método post é enviado para a API
                headers: { 'Content-Type': 'application/json' },//tipo de conteúdo enviado para a API
                body: JSON.stringify({ email, password }),//passa os dados em formato JSON
            });
    
            console.log('Resposta recebida da API:', response);// log de verificação
            if (!response.ok) {
                throw new Error(`Erro na requisição: ${response.status}`);//se a resposta não for ok, retorna um erro
            }
    
            let data = await response.json();//recebe os dados da resposta da API
            console.log('Resposta do servidor:', data);
    
            if (data.success && data.user) {//se a resposta for sucesso e tiver usuário
                console.log('Usuário autenticado com sucesso:', data.user);
                const { cliente_id, nome, email ,telefone} = data.user;//pega os dados do usuário
    
                if (cliente_id && nome && email) {//se tiver id, nome e email
                    await AsyncStorage.setItem('user_id', cliente_id.toString());// guarda essas variaveis com asyncStorage para serem enviadas por tipagem
                    await AsyncStorage.setItem('user_email', email);
                    await AsyncStorage.setItem('telemovel_user', telefone);
    
                    Alert.alert('Sucesso', data.message);
                    navigation.navigate('aut');
                } else {
                    Alert.alert('Erro', 'Dados de usuário incompletos');
                }
            } else {
                Alert.alert('Erro', data.message || 'Dados de login inválidos');
            }
        } catch (err) {
            console.error('Erro ao autenticar:', err);
            Alert.alert('Erro', 'Falha na conexão com o servidor');
        } finally {
            setIsLoading(false);
        }
    };
    

    const togglePasswordVisibility = () => {//função para mostrar ou esconder a password
        setShowPassword(!showPassword);
    };

    return (
        <KeyboardAvoidingView 
            behavior={Platform.OS == "ios" ? "padding" : "height"}  
            style={{flex: 1, backgroundColor:'#62466B'}}>

            <View style={stylemain.mainConteiner}>
                <Image style={stylemain.imag} source={require('../assets/images/venda2.png')}/>
            </View>
            <ScrollView style={stylemain.secondConteiner}>
                <View>
                    <Text style={stylemain.textinput}> E-mail: </Text>
                    <TextInput 
                        style={stylemain.input} 
                        placeholder="Exemplo@gmail.com"
                        value={email}
                        onChangeText={setEmail}
                    />

                    <Text style={stylemain.textinput}> Password: </Text>
                    <TextInput 
                        secureTextEntry={!showPassword}  
                        style={stylemain.input}  
                        value={password}
                        onChangeText={setPassword}
                    />

                    <TouchableOpacity 
                        style={stylemain.eye} 
                        onPress={togglePasswordVisibility} 
                    >
                        <FontAwesome5 
                            name={showPassword ? 'eye' : 'eye-slash'} 
                            size={20} 
                            color="black" 
                        />
                    </TouchableOpacity>

                    <TouchableOpacity style={[stylemain.btn, {top: 30}]} 
                        onPress={handleLogin}
                        activeOpacity={0.7} 
                    >
                        <Text style={stylemain.txt}>Iniciar Sessão</Text>
                        <AntDesign 
                            name="user" 
                            size={30} 
                            color="black" 
                            style={stylemain.seta} 
                        />
                    </TouchableOpacity>
                </View>
            </ScrollView>

            {isLoading && (
                <View style={{ position: 'absolute', alignSelf: 'center',top:700}}>
                    <ActivityIndicator size="large" color="#fff" />
                    <Text style={{ color: '#fff', fontWeight: 'bold' }}> Verificando dados ...</Text>
                </View>
            )}
        </KeyboardAvoidingView>
    );
}
