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
    const newOtp = generateOtp(); // Gerar um codigo aletorio
    setMensagem(newOtp); // Guardar o codigo gerado
    console.log(`Enviando OTP ${newOtp} para ${phone}`);// Mostrar no console somente foi para testes
    try {
      const response = await fetch(`${API_URL}/api/sendMessage.php?phone=351${phone}&message=${newOtp}`, { // Enviar a mensagem via API
        method: 'GET', // usa o metodo GET para requisitar a API(pq é uma requisicao http)
      });
      const data = await response.json();// Converte a resposta em JSON
      console.log('Resposta da API:', data);// somente para testes
      return data;// Retorna a resposta da API
    } catch (error) {// Caso ocorra um erro
      console.error('Erro ao enviar mensagem:', error);// Mostra o erro no console
      throw error;
    }
  };
  

  const handleVerifyOtp = () => {
    if (otp.length !== 6) {// Verifica se o codigo inserido tem 6 digitos
      setError('Por favor, insira um código de 6 dígitos.');//  Mostra uma mensagem de erro
      return;
    }
    setIsLoading(true);//ficar a carregar
    setError('');//limpar a mensagem de erro

    setTimeout(() => {
      if(otp === mensagem){// Verifica se o codigo inserido é igual ao codigo gerado
      alert('Código verificado com sucesso!');// Mostra uma mensagem de sucesso
      navigation.navigate('Main');// Navega para a tela Main que é a tela principal
      }else{
        alert('Código inválido!');// Mostra uma mensagem de erro
        setIsLoading(false);
      }
    }, 1500);// Tempo de espera para verificar o codigo
  };

  const handleCancel = () => {
    navigation.goBack(); // Retorna para a tela anterior 
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>{/* é para o teclado não cobrir as caixas de input */}
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

          {error ? <Text style={styles.errorText}>{error}</Text> : null}{/* se não for 6 digitos ira mostra a mensagem de erro*/}
          {/* aqui ele mostra verificando se estiver isLoading a true senão fica avançar  quando precionado vai chamar a funçao*/}
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