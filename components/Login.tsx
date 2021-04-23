import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, SafeAreaView, Button, Alert, AsyncStorage } from 'react-native';

const axios = require('axios');

export default class Login extends React.Component {
    state = {
        email: "usuario@teste.com",
        password: "usuario_test_@@"
    };
    submeter(email : string, password : string){
      axios.post('https://delivery.leaderaplicativos.com.br/api/api-token-auth/', {
      email: email,
      password: password,
      }).then((resp: any) => {
        const token = resp.data.token
        this.saveToken(token)
      })
      .catch((error: any) => {    
        Alert.alert('Algum erro aconteceu.')
      })
    }
    changeInputEmail(value: any){
      this.setState({email: value})
    }
    changeInputPassowrd(value: any){
      this.setState({password: value})
    }
    async saveToken(token: string){
      try {
        await AsyncStorage.setItem(
          'token',
          token
        );
      } catch (error) {
        // Error saving data
      }
    }
    render() {  
      return (
        <View style={styles.container}>
           <Text style={{fontSize: 19}}>Fazer login</Text>
           <SafeAreaView>
              <TextInput
                  style={styles.input}
                  onChangeText={email => this.changeInputEmail(email)}
                  placeholder="E-mail"
                  value={this.state.email}
              />
              <TextInput
                  style={styles.input}
                  onChangeText={password => this.changeInputPassowrd(password)}
                  placeholder="Senha"
                  secureTextEntry={true}
                  value={this.state.password}
              />
              <Button
              onPress={() => this.submeter(this.state.email, this.state.password)}
              title="Logar"
              accessibilityLabel="Fazer login."
            />
          </SafeAreaView>
        </View>
      );
    }
  }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    height: 40,
    margin: 12,
    width: 200,
    borderWidth: 1,
    padding: 4
  },
});
