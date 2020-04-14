/**
 * Vídeo #1 ao #48: Whatsapp (Devsapp) - Módulo 16 - Projeto com React Native - B7Web
 * Aplicando todos os conhecimentos adquiridos.
 * by: Vagner Pinto
 */

import React from 'react';
import {StyleSheet, View, Text, FlatList} from 'react-native';
import {connect} from "react-redux";
import {checkLogin} from "../actions/AuthActions";

export class ChatsTab extends React.Component{ //retirar o default, ele vai para o final, o redux é que será o default
    constructor(props) {
        super(props);
        console.log('construiu o ChatsTab.');
    }

    render(){
        return(
            <View style={styles.container}>
                <Text>Status={this.props.status}  uid={this.props.uid}</Text>
            </View>
        );
    }
}
const mapStateToProps = (state) => { //mapeia os states do reducer para as props desse componente
    return {
        uid:state.auth.uid,
        status:state.auth.status
    };
};
const ChatsTabConnect = connect(mapStateToProps, {checkLogin})(ChatsTab); //conecta os dois componentes (suas props)
export default ChatsTabConnect; //exporta o componente como padrão

const styles = StyleSheet.create({
    container:{
        flex:1
    }
});
