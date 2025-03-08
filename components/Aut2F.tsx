import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Para navegação
import stylemain from '../Styles/StyleLogin';
import { StackNavigationProp } from "@react-navigation/stack";

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

// Função simulada para enviar a mensagem via API
const sendWhatsappMessage = async (phone: string, message: string) => {
  console.log(`Simulando envio de mensagem para ${phone}: ${message}`);

  // Simulando uma resposta da API com sucesso
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true });
    }, 1000);
  });
};

export default function Aut2F() {
  const [otp, setOtp] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  
  const navigation = useNavigation<StackNavigationProp<RootStackParamList, 'aut'>>(); // Usando a navegação com tipo correto

  const handleVerifyOtp = () => {
    if (otp.length !== 6) {
      setError('Por favor, insira um código de 6 dígitos.');
      return;
    }
    setIsLoading(true);
    setError('');

    setTimeout(() => {
      // Simulando a chamada à API
      sendWhatsappMessage('+351910066962', 'O seu código de autenticação foi verificado com sucesso!')
        .then(() => {
          alert('Código verificado com sucesso!'); // Feedback para o usuário
          navigation.navigate('Main'); // Navega para a tela 'Main'
        })
        .catch((err) => {
          console.log('Erro ao simular envio de mensagem:', err);
          setError('Erro ao enviar a mensagem.');
        })
        .finally(() => {
          setIsLoading(false);
        });
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

          {/* Botão Cancelar para voltar ao login */}
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
