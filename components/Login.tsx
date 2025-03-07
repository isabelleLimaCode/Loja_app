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


export default function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [passwuser, setpassuser] = useState(''); 

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handlechangedatapass = (text : string) => {
        setpassuser(text);
    };

    return (
        <KeyboardAvoidingView 
            behavior={Platform.OS == "ios" ? "padding" : "height"}  
            style={{flex: 1,backgroundColor:'#62466B'}}>

             <View style={stylemain.mainConteiner}>
             <Image style= {stylemain.imag} source={require('../assets/images/venda2.png')}/>
             </View>
            <ScrollView style={stylemain.secondConteiner}>
                <View>
                    <Text style={stylemain.textinput}> E-mail: </Text>
                    <TextInput 
                        style={stylemain.input} 
                        placeholder="Exemplo@gmail.com"  
                    />

                    <Text style={stylemain.textinput}> Password: </Text>
                    <TextInput 
                        secureTextEntry={!showPassword}  
                        style={stylemain.input}  
                        onChangeText={handlechangedatapass} 
                        value={passwuser} // Associando o valor da senha ao estado
                    />

                    <TouchableOpacity 
                        style={stylemain.eye} 
                        onPress={togglePasswordVisibility} // Chamando a função ao pressionar
                    >
                        <FontAwesome5 
                            name={showPassword ? 'eye' : 'eye-slash'} 
                            size={20} 
                            color="black" 
                        />
                    </TouchableOpacity>

                    <TouchableOpacity style={[stylemain.btn, {top: 30}]}>
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
