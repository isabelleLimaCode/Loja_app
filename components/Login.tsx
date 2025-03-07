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
import { FontAwesome5 ,AntDesign} from '@expo/vector-icons';


  

export default function Login() {

    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

  return (

    <KeyboardAvoidingView 
    behavior={Platform.OS == "ios" ? "padding" : "height"}  style={{flex:1, backgroundColor:'#082854'}} >
       
        <ScrollView style={stylemain.secondConteiner}>
                  
            <View >
                                    
                <Text style={stylemain.textinput}>    E-mail: </Text>
                <TextInput style={stylemain.input} placeholder="Exemplo@gmail.com"  /> 


                       
                <Text style={stylemain.textinput}>    Password: </Text>
                <TextInput   style={stylemain.input} /> 
                
               <TouchableOpacity  style={stylemain.eye}>
                    <FontAwesome5 name={showPassword ? 'eye' : 'eye-slash'} size={20} color="black" />
                </TouchableOpacity>

                <TouchableOpacity style={[stylemain.btn,{top:30}]}  >
                    <Text style={stylemain.txt}>Iniciar Sessão</Text>
                    <FontAwesome5 name="location-arrow" size={20} color="white" style={stylemain.seta} />
                </TouchableOpacity>

                
            </View>
        </ScrollView>
        {isLoading &&(
                        <View style={{position:'absolute',alignSelf:'center',top:750}}>
                            <ActivityIndicator size="large" color="#fff" />
                        
                                <Text style={{color:'#fff',fontWeight:'bold'}}> Verificando dados ...</Text>
                            
                        </View>
        )}
    </KeyboardAvoidingView>
  );
}