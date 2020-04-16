/**
 * Vídeo #1 ao #48: Whatsapp (Devsapp) - Módulo 16 - Projeto com React Native - B7Web
 * Aplicando todos os conhecimentos adquiridos.
 * Obs.: (dê preferencia para o yarn, é mais rápido)
 *  1. Para instalar as dependências do Navigation utilize o how-to em: https://reactnavigation.org/docs/getting-started/;
 *  2. Para instalar as dependências do Redux execute: (documentação do Redux em: https://redux.js.org/)
 *      npm install --save redux    ou  yarn add redux
 *      npm install --save react-redux  ou  yarn add react-redux
 *  3. Para instalar o redux-thunk (para requisições assíncronas como redux) execute:
 *      npm install --save redux-thunk ou yarn add redux-thunk
 * by: Vagner Pinto
 */

import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import ReduxThunk from 'redux-thunk';

import Reducers from "./src/reducers/Reducers";
import Preload from "./src/screens/Preload";
import Home from "./src/screens/Home";
import SingIn from "./src/screens/SingIn";
import SignUp from "./src/screens/SignUp";
import Chat from './src/screens/Chat';

let store = createStore(Reducers, applyMiddleware(ReduxThunk)); //redux e redux-thunk
const Stack = createStackNavigator(); //navigation
function App() {
  console.disableYellowBox = true; //habilitar para ver advertências do react native no dispositivo
  return (
      <Provider store={store}>
          <NavigationContainer>
            <Stack.Navigator initialRouteName="Preload">
                <Stack.Screen
                    name="Preload"
                    component={Preload}
                    options={preloadStyle} />
                <Stack.Screen
                  name="Home"
                  component={Home}
                  options={homeStyle} />
                <Stack.Screen
                    name="SignIn"
                    component={SingIn}
                    options={SingInStyle} />
                <Stack.Screen
                    name="SignUp"
                    component={SignUp}
                    options={SingUpStyle} />
                <Stack.Screen
                    name="Chat"
                    component={Chat}
                    options={Chat.navigationOptions} />
            </Stack.Navigator>
          </NavigationContainer>
      </Provider>
  );
}
export default App;

//estilos das screens
const preloadStyle = {
    headerShown:false
};
const homeStyle = {
    title: 'WhatsappBR',
    headerStyle:{backgroundColor:'#2da832'},
    headerTitleStyle:{color:'#ffe51f'}
};
const SingInStyle = {
    headerLeft:false,
    title: 'Bem vindo',
    headerStyle:{backgroundColor:'#2da832'},
    headerTitleStyle:{color:'#ffe51f'}
};
const SingUpStyle = {
    headerLeft:false,
    title: 'Cadastre-se',
    headerStyle:{backgroundColor:'#2da832'},
    headerTitleStyle:{color:'#ffe51f'}
};
