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
            alignSelf:'flex-start',
            date:this.formatDate(this.props.data.date)
        };

        if(this.props.data.uid === this.props.uid){
            let s = this.state;
            s.bgColor = '#2da832';
            s.alignSelf = 'flex-end';
            this.setState(s);
        }
    }

    formatDate(originalDate){
        let cDate = new Date();
        let today = cDate.getFullYear() + '-' + (cDate.getMonth()+1)  + '-' + cDate.getDate(); //YYYY-MM-DD
        let mDate = originalDate.split(' '); //resulta em [data, hora]

        let newDate = mDate[1].substring(0,5); //resulta em HH:mm

        if(today !== mDate[0]){
            let date = mDate[0].split('-'); //[year, month, day]
            newDate = date[2] + '/' + date[1] + '/' + date[0] + ' ' + newDate;
        }

        return newDate;
    }

    render(){
        return(
            <View style={[styles.container, {backgroundColor:this.state.bgColor}, {alignSelf:this.state.alignSelf}]}>
                <Text style={styles.msgText}>{this.props.data.msg}</Text>
                <Text style={styles.dateText}>{this.state.date}</Text>
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
