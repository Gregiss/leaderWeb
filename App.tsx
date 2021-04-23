import React, { useState } from 'react';
import { StyleSheet, Text, View, AsyncStorage } from 'react-native';
import Splash from './components/Splash';
import LoginForm from './components/Login';
import Dashboard from './components/Dashboard';


class App extends React.Component {
  state = {
    carregado: false,
    interval: null,
    logado: false
  };
  componentDidMount() {
    setTimeout(() => {
      this.setState({
        carregado: true,
      });
    }, 5000);
    //Limpando o token
    this.saveToken("")
    this.state.interval = setInterval(() => {
      this.validarToken()
    }, 1000)
  }
  async validarToken(){
    try {
      const value = await AsyncStorage.getItem('token');
      if (value !== null) {
        // We have data!!
        if(value.trim().length > 0){
          this.setState({logado: true})
          clearInterval(this.state.interval)
        }
      }
    } catch (error) {
      // Error retrieving data
    }
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
      <View  style={styles.container}>
        { !this.state.carregado &&
        <Splash></Splash>
        }
        { this.state.carregado &&
        !this.state.logado &&
        <LoginForm></LoginForm>
        }
        { this.state.carregado &&
        this.state.logado &&
        <Dashboard></Dashboard>
        }
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
});

export default App;