import react from "react";
import {StyleSheet,Dimensions} from "react-native";

const Cardwidth = Math.round(Dimensions.get('window').width); // deixa o card do tamanho consoante a sua informação
export default StyleSheet.create({
    mainConteiner:{
        backgroundColor: '#2D2327',
        width:'auto',
        height:300,
        alignItems:'center',
        justifyContent:'center',
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20

        
    },
    imgh:{
        width:220,
        height:220,
        alignSelf:'center',
        marginTop:10
    },
    text: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#333',
    },

    title: {
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#333',
        marginBottom: 10,
    },
    card: {
        width: '90%',
        padding: 15,
        backgroundColor: 'white',
        elevation: 3,
        borderRadius: 10,
        alignSelf: 'center',
        marginTop:70
    },
    description: {
        fontSize: 16,
        textAlign: 'center',
        color: '#555',
        marginBottom: 10,
    },

    input: { 
        top:30,
        height:40,
        margin:12,
        borderWidth:1,
        padding:10,
        fontSize:16,
        borderColor:'#EDEFEE',
        backgroundColor:'#fff',
        width:350,
        borderRadius:10,
        alignSelf:'center'
    }, 

    textinput:{
        color:'#fff',
        top:30,
        left:18,
    },  


    secondConteiner:{
        backgroundColor:'#62466B',
        borderTopLeftRadius: 20, 
        borderTopRightRadius: 20, 
        flex:2,
        marginTop:70
        
    },

    eye:{
        alignSelf:'flex-end',
        top:-10,
        right:34
    },

    eye2:{
        alignSelf:'flex-end',
        top:26,
        right:20
    },

    btn: {      
        width:180,
        height:48,
        borderRadius: 15,
        backgroundColor: '#fff',
        alignSelf:'center',
      },
    
    seta: {
        left:10,
        top:-7
    },

    txt:{
        color:'black',
        alignSelf:'center',
        top:15,
        left:10
    },
    imag7:{
        width:200,
        height:200,
        alignSelf:'center',
        marginTop:60
    },

    imag:{
        width:320,
        height:320,
        alignSelf:'center',
        marginTop:60
    },
    imag3:{
        width:220,
        height:220,
        alignSelf:'center',
        marginTop:60
    },

    imag2:{
        width:52,
        height:35,
        alignSelf:'center',
        top:-35,
        left:40
    },

    logo: {
        width:350,
       height:350,
       alignSelf:'center',
       left:-15
    },

    imag8:{
        width:25,
       height:25,
       alignSelf:'flex-start',
       backgroundColor:'#fff',
       left:20,
       top:-50
    },

    btn2: {      
        width:180,
        height:48,
        borderRadius: 15,
        backgroundColor: '#fff',
        alignSelf:'center',
        top:18
      },

      txt2:{
        fontSize:16,
        alignSelf:'center',
        top:13,
        color:'#BDBDBD',
        width:130,
        height:60,
        borderRadius:15,
        right:-50
      },

});