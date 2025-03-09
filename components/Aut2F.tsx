import React, { useEffect, useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  Button, 
  StyleSheet, 
  Image, 
  KeyboardAvoidingView, 
  TouchableWithoutFeedback, 
  Keyboard
} from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Para navegação
import stylemain from '../Styles/StyleLogin';
import { StackNavigationProp } from "@react-navigation/stack";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '@/BackEnd/config/api_url';

// Definindo o tipo para as rotas
type RootStackParamList = {
  login: undefined;
  Main: undefined;
  test: undefined;
  aut: undefined;
};

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'aut'>; // Especificando a navegação para a tela 'aut'
};



export default function Aut2F() {
  const [otp, setOtp] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [telefone, setTelefone] = useState<string | null>(null);
  const [mensagem, setMensagem] = useState<string | null>(null); // Mensagem a ser enviada
  const navigation = useNavigation<StackNavigationProp<RootStackParamList, 'aut'>>(); // Usando a navegação com tipo correto


  const generateOtp = () => Math.floor(100000 + Math.random() * 900000).toString();
  useEffect(() =>{
    const loadUserData = async () => {
      const storedTelefone = await AsyncStorage.getItem('telemovel_user');
      if (storedTelefone) {
        setTelefone(storedTelefone);//carrega o telemovel do user logado
        console.log('Telemovel do user:', storedTelefone);
        sendWhatsappMessage(storedTelefone);
      }
    };
    loadUserData();
  }, []);

  // Função para enviar a mensagem via API real
  const sendWhatsappMessage = async (phone: string) => {
    const newOtp = generateOtp();
    setMensagem(newOtp);
    console.log(`Enviando OTP ${newOtp} para ${phone}`);
    try {
      const response = await fetch(`${API_URL}/api/sendMessage.php?phone=351${phone}&message=${newOtp}`, {
        method: 'GET', 
      });
      const data = await response.json();
      console.log('Resposta da API:', data);
      return data;
    } catch (error) {
      console.error('Erro ao enviar mensagem:', error);
      throw error;
    }
  };
  

  const handleVerifyOtp = () => {
    if (otp.length !== 6) {
      setError('Por favor, insira um código de 6 dígitos.');
      return;
    }
    setIsLoading(true);
    setError('');

    setTimeout(() => {
      if(otp === mensagem){
      alert('Código verificado com sucesso!');
      navigation.navigate('Main');
      }else{
        alert('Código inválido!');
        setIsLoading(false);
      }
    }, 1500);
  };

  const handleCancel = () => {
    navigation.goBack(); // Retorna para a tela anterior 
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.innerContainer}>
          <Text style={styles.title}>Verificação de Autenticação de Dois Fatores</Text>
          <Image style={stylemain.imag7} source={require('../assets/images/factor.png')} />
          <Text style={styles.subtitle}>
            Insira o código de 6 dígitos que enviamos para o teu número de telemóvel que termina em 222
            para concluir a configuração da autenticação de dois fatores.
          </Text>

          <TextInput
            style={styles.input}
            placeholder="Digite o código de 6 dígitos"
            keyboardType="numeric"
            maxLength={6}
            value={otp}
            onChangeText={setOtp}
            autoFocus
            textAlign="center"
          />

          {error ? <Text style={styles.errorText}>{error}</Text> : null}

          <Button
            title={isLoading ? 'Verificando...' : 'Avançar'}
            onPress={handleVerifyOtp}
            disabled={isLoading}
          />

          <Button
            title="Cancelar"
            onPress={handleCancel}
            color="red"
          />
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#2D2327',
  },
  innerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#fff',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    color: '#fff',
  },
  input: {
    width: '60%',
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
    backgroundColor: '#fff',
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
});