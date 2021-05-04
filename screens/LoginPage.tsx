import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image } from 'react-native';
var luminaLogo = require('../assets/images/luminalogo.jpg');
var luminaGif = require('../assets/images/luminagif.gif');
export default class LoginPage extends React.Component {
  
  state={
    email:"",
    password:""
  }
  render(){
    return (
      <View style={styles.container}>
        <Image source={luminaGif}
          style={styles.logoSize}/>
        <View style={styles.inputView} >
          <TextInput  
            style={styles.inputText}
            placeholder="Adresse e-mail" 
            placeholderTextColor="white"
            onChangeText={text => this.setState({email:text})}/>
        </View>
        <View style={styles.inputView} >
          <TextInput  
            secureTextEntry
            style={styles.inputText}
            placeholder="Mot de passe" 
            placeholderTextColor="white"
            onChangeText={text => this.setState({password:text})}/>
        </View>
        <TouchableOpacity style={styles.loginBtn}>
          <Text style={styles.loginText}>SE CONNECTER</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.forgot}>Mot de passe oublié ?</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.loginText}>S'inscrire</Text>
        </TouchableOpacity>

  
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#518184',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo:{
    fontWeight:"bold",
    fontSize:50,
    color:"#b0413e",
    marginBottom:40
  },
  inputView:{
    width:"80%",
    backgroundColor:"#b0413e",
    borderRadius:25,
    height:50,
    marginBottom:20,
    justifyContent:"center",
    padding:20
  },
  inputText:{
    height:50,
    color:"white"
  },
  forgot:{
    color:"white"
  },
  loginBtn:{
    width:"80%",
    backgroundColor:"#b0413e",
    borderRadius:25,
    height:50,
    alignItems:"center",
    justifyContent:"center",
    marginTop:20,
    marginBottom:10
  },
  loginText:{
    color:"white"
  },
  logoSize: {
    width: 225,
    height: 225,
    marginBottom: 100,
  }
});