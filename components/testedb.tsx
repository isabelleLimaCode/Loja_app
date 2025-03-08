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
  const [clientes, setClientes] = useState<Cliente[]>([]); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState<string | null>(null); 

  
  useEffect(() => {
    const fetchData = async () => {
      try {
        let response = await fetch('http://172.20.10.3:8000/api/getClientes.php');// utilizar o ip da lan do pc
        let data = await response.json();
        console.log('Dados recebidos:', data);
        setClientes(data);
      } catch (err) {
        console.error('Erro ao obter clientes:', err);
      } finally {
        setLoading(false);
      }
    };
  
    fetchData();
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
