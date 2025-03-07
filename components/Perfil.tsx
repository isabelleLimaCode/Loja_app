import React, { useState } from 'react';
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
import { FontAwesome5, AntDesign } from '@expo/vector-icons';
import { StackNavigationProp } from "@react-navigation/stack";
import { HelperText, TextInput,Button } from 'react-native-paper';
import stylemain from '../Styles/StyleLogin';
import { useNavigation } from '@react-navigation/native'; // Hook para acessar a navegação
import { CommonActions } from '@react-navigation/native'; // Funções de navegação comuns

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

     const reset = () =>{
            setTimeout(() => {
                navigation.dispatch(
                    CommonActions.reset({
                        index: 0,
                        routes: [{ name: 'login' }]
                    })
                );
            }, 1000);
        }

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
            <Button style={{backgroundColor:'#B5C2B7', width:250,alignSelf:'center', marginTop:8}} mode="contained"  onPress={reset}>
                Sair
            </Button>
            </ScrollView>
            
        </KeyboardAvoidingView>
    );
}
