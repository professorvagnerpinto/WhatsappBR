/**
 * Vídeo #1 ao #48: Whatsapp (Devsapp) - Módulo 16 - Projeto com React Native - B7Web
 * Aplicando todos os conhecimentos adquiridos.
 * by: Vagner Pinto
 */

import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {connect} from 'react-redux';

export class MensagemItem extends React.Component{ //retirar o default, ele vai para o final, o redux é que será o default
    constructor(props) {
        super(props);
        this.state = {
            bgColor:'#ffe51f',
            alignSelf:'flex-start'
        }

        if(this.props.data.userUid === this.props.uid){
            let s = this.state;
            s.bgColor = '#2da832';
            s.alignSelf = 'flex-end';
            this.setState(s);
        }
    }

    render(){
        console.log('state= ' + this.state);
        return(
            <View style={[styles.container, {backgroundColor:this.state.bgColor}, {alignSelf:this.state.alignSelf}]}>
                <Text style={styles.msgText}>{this.props.data.msg}</Text>
                <Text style={styles.dateText}>{this.props.data.date}</Text>
            </View>
        );
    }
}
const mapStateToProps = (state) => { //mapeia os states do reducer para as props desse componente
    return {
        uid:state.auth.uid
    };
};
const MensagemItemConnect = connect(mapStateToProps, {})(MensagemItem); //conecta os dois componentes (suas props)
export default MensagemItemConnect; //exporta o componente como padrão


const styles = StyleSheet.create({
    container:{
        marginLeft:10,
        marginRight:10,
        marginTop:5,
        padding:8,
        borderRadius:5,
        maxWidth:'80%'
    },
    msgText:{
        color:'#003c00'
    },
    dateText:{
        color:'#003c00',
        fontSize:8,
        alignSelf:'flex-end'
    }
});
