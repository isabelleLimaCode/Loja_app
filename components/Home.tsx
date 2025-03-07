import * as React from 'react';
import { View, Text, StyleSheet ,Image} from 'react-native';
import { Drawer ,Card, Title, Paragraph, Button } from 'react-native-paper';
import stylemain from '../Styles/StyleLogin';

export default function Home() {

    return (
        <View>
            <Image style= {stylemain.imag} source={require('../assets/images/home.png')}/>
            <Card style={stylemain.card}>
                <Card.Content>
                    <Text style={stylemain.title}>Bem-vindo à nossa loja!</Text>
                    <Text style={stylemain.description}>Encontre estilo e conforto em cada peça. Explore nossa coleção exclusiva e descubra a moda perfeita para si.</Text>
                </Card.Content>
                <Card.Actions>
                    <Button mode="contained" onPress={() => console.log('Explorar')}>Explorar</Button>
                </Card.Actions>
            </Card>
        </View>
    );
}
