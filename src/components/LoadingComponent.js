/**
 * Vídeo #1 ao #48: Whatsapp (Devsapp) - Módulo 16 - Projeto com React Native - B7Web
 * Aplicando todos os conhecimentos adquiridos.
 * by: Vagner Pinto
 */

import React from 'react';
import {StyleSheet, View, Modal, ActivityIndicator} from 'react-native';

export default class LoadingComponent extends React.Component{

    render(){
        return (
            <Modal animationType="none" transparent visible={this.props.visible}>
                <View styles={styles.loadingView}>
                    <ActivityIndicator size="large" color="#1874cd"/>
                </View>
            </Modal>
        );
    }
}

const styles = StyleSheet.create({
    loadingView:{
        position:'absolute',
        top:0,
        bottom:0,
        left:0,
        right:0,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#000000',
        opacity:0.5
    }
});
