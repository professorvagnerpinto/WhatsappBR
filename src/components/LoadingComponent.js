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
                <View style={styles.loadingView}>
                    <ActivityIndicator size="large" color="#104eb8"/>
                </View>
            </Modal>
        );
    }
}

const styles = StyleSheet.create({
    loadingView: {
        flex: 1,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor: 'rgba(0,0,0,0.5)' //R,G,B,alfa
    }
});
