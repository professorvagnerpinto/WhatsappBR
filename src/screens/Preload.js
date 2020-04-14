/**
 * Vídeo #1 ao #48: Whatsapp (Devsapp) - Módulo 16 - Projeto com React Native - B7Web
 * Aplicando todos os conhecimentos adquiridos.
 * by: Vagner Pinto
 */

import React from 'react';
import {StyleSheet, View, Image, Text} from 'react-native';
import {connect} from "react-redux";
import {checkLogin} from "../actions/AuthActions";

export class Preload extends React.Component{

    constructor(props){
        super(props);
        this.routes = this.routes.bind(this); //faz o bind do comportamemto com o componente
        this.props.checkLogin();
        console.log('construiu Preload.');
    }

    routes(){
        if(this.props.status === 2){
            this.props.navigation.reset({
                index:0,
                routes: [{ name: 'SignIn' }]
            });
        }else if(this.props.status === 1){
            this.props.navigation.reset({
                index:0,
                routes: [{ name: 'Home' }]
            });
        }
    }

    componentDidMount(){
        this.routes();
    }

    componentDidUpdate() {
        this.routes();
    }

    render(){
        return (
            <View style={styles.container}>
                <View style={styles.divHeader}>
                    <Image style={styles.image} source={require('../../assets/images/icon_playstore.png')} />
                </View>
                <View style={styles.divBody}>
                    <Text style={styles.textMyCash}>WhatsappDev</Text>
                    <Text>by Vagner Pinto</Text>
                </View>
            </View>
        );
    }
}
const mapStateToProps = (state) => { //mapeia os states do reducer para as props desse componente
    return {
        status:state.auth.status
    };
};
const PreloadConnect = connect(mapStateToProps, {checkLogin})(Preload); //conecta os dois componentes (suas props)
export default PreloadConnect; //exporta o componente como padrão

const styles = StyleSheet.create({
    container:{
        flex:1,
        flexDirection:'column',
    },
    divHeader:{
        flex:1,
        alignItems:'center',
        marginTop:100
    },
    divBody:{
        flex:2,
        alignItems:'center'
    },
    image:{
        width:120,
        height:120
    },
    textMyCash:{
        fontSize:36
    }
});
