import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from 'react-native';
import stylemain from '../Styles/StyleLogin';

export default function Aut2F() {
  const [otp, setOtp] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const handleVerifyOtp = () => {
    if (otp.length !== 6) {
      setError('Por favor, insira um código de 6 dígitos.');
      return;
    }
    setIsLoading(true);
    setError('');
    // Simulação de uma chamada de verificação (substitua com a lógica de sua API)
    setTimeout(() => {
      if (otp === '123456') {  // Simule um OTP válido
        setIsLoading(false);
        alert('Autenticação bem-sucedida!');
      } else {
        setIsLoading(false);
        setError('Código inválido. Tente novamente.');
      }
    }, 1500);
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
