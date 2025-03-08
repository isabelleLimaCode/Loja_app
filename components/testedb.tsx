import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';

interface Cliente {
  cliente_id: number;
  nome: string;
  email: string;
  telefone?: string;
  data_nascimento?: string;
}

const Clientes = () => {
  const [clientes, setClientes] = useState<Cliente[]>([]); // Define o tipo explicitamente
  const [loading, setLoading] = useState(true); // Para indicar que está a carregar
  const [error, setError] = useState<string | null>(null); // Para capturar erros da API

  
  useEffect(() => {
    fetch('http://192.168.182.1:8000/api/getClientes.php') // Usa o teu IP correto
      .then(response => response.json())
      .then(data => {
        if (Array.isArray(data)) {
          setClientes(data);
        } else {
          setError('Erro: Dados inválidos');
        }
      })
      .catch(err => setError('Erro ao obter clientes: ' + err.message))
      .finally(() => setLoading(false));
  }, []);
  
  

  return (
    <View style={{ paddingTop: 50}}>
      <Text>Clientes</Text>
      <FlatList
        data={clientes}
        keyExtractor={(cliente) => cliente.cliente_id.toString()}
        renderItem={({ item }) => (
          <View>
            <Text>{item.nome} - {item.email}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default Clientes;
