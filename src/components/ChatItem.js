/**
 * Vídeo #1 ao #48: Whatsapp (Devsapp) - Módulo 16 - Projeto com React Native - B7Web
 * Aplicando todos os conhecimentos adquiridos.
 * by: Vagner Pinto
 */

import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';

export default class ChatItem extends React.Component{
    constructor(props) {
        super(props);
    }

    render(){
        return(
            <TouchableOpacity underlayColor={'#ffe51f'} style={styles.button} onPress={()=>{this.props.onPress(this.props.data)}} >
                <Text>{this.props.data.key}</Text>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    button:{
        height:40,
        flex:1,
        flexDirection:'row',
        justifyContent:'flex-start',
        padding:5,
        margin:5,
        borderBottomWidth:2,
        borderBottomColor:'#2da832'
    }
});
