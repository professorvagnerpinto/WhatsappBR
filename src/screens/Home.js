/**
 * Vídeo #1 ao #48: Whatsapp (Devsapp) - Módulo 16 - Projeto com React Native - B7Web
 * Aplicando todos os conhecimentos adquiridos.
 * by: Vagner Pinto
 */

import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import ChatsTab from "./ChatsTab";
import ContatosTab from "./ContatosTab";
import ConfiguracoesTab from "./ConfiguracoesTab";


const Tab = createMaterialTopTabNavigator();
function App() {
    return (
        <Tab.Navigator
            tabBarOptions={{
                initialRouteName:'ChatsTab',
                activeTintColor: '#ffe51f',
                labelStyle: { height: 10, fontSize: 9, margin:0, fontWeight:'bold'},
                style: { backgroundColor: '#2da832' },
                showIcon:true
            }} >
            <Tab.Screen
                name="ChatsTab"
                component={ChatsTab}
                options={{title:'Conversas'}} />
            <Tab.Screen
                name="ContatosTab"
                component={ContatosTab}
                options={{title:'Contatos'}} />
            <Tab.Screen
                name="ConfiguracoesTab"
                component={ConfiguracoesTab}
                options={{title:'Configurações'}} />
        </Tab.Navigator>
    );
}
export default App;
