import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Drawer ,Card, Title, Paragraph, Button } from 'react-native-paper';

export default function Dashboard() {
    const [active, setActive] = React.useState('');

    return (
        <View style={styles.container}>
          
            <Text style={styles.title}>Produtos</Text>
          
            <Card style={styles.card}>
            <Card.Cover source={require('../assets/images/venda2.png')} style={styles.image} />
                <Card.Content>
                    <Title style={styles.title2}>teste</Title>
                    <Paragraph style={styles.price}>€2.00</Paragraph>
                </Card.Content>
                <Card.Actions>
                    <Button  mode="contained" onPress={() => console.log("Comprou", "teste")}>
                    Editar
                    </Button>
                    <Button mode="contained" onPress={() => console.log("Comprou", "teste")}>
                    Eliminar
                    </Button>
                </Card.Actions>
            </Card>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 50,
        backgroundColor: '#f5f5f5',
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10,
        color: '#333',
    },
    card: {
        margin: 10,
        borderRadius: 10,
        overflow: "hidden",
        elevation: 4, 
      },
      image: {
        height: 150,
      },
      title2: {
        fontSize: 18,
        fontWeight: "bold",
      },
      price: {
        fontSize: 16,
        color: "green",
        marginBottom: 5,
      },
});
