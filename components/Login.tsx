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

type RootStackParamList = {
    login: undefined;
    Main: undefined;
};

type Props = {
    navigation: StackNavigationProp<RootStackParamList, "login">;
};

export default function Login({ navigation }: Props) {
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        setIsLoading(true);
        try {
            let response = await fetch('http://172.20.10.3:8000/api/login.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });
    
            let data = await response.json();
            console.log('Resposta do servidor:', data);
    
            // Verifique se 'user' existe dentro da resposta antes de tentar acessar suas propriedades
            if (data.success && data.user) {
                const { cliente_id, nome, email } = data.user;
                console.log('Dados do usuário:', cliente_id, nome, email);
    
                if (cliente_id && nome && email) {
                    // Salve as informações do usuário no AsyncStorage para futuras verificações
                    await AsyncStorage.setItem('user_id', cliente_id.toString());
                    await AsyncStorage.setItem('user_email', email);
    
                    Alert.alert('Sucesso', data.message);
                    navigation.navigate('Main');
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
    

    const togglePasswordVisibility = () => {
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
                <View style={{ position: 'absolute', alignSelf: 'center', top: '50%' }}>
                    <ActivityIndicator size="large" color="#fff" />
                    <Text style={{ color: '#fff', fontWeight: 'bold' }}> Verificando dados ...</Text>
                </View>
            )}
        </KeyboardAvoidingView>
    );
}
