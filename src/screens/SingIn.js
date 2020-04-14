/**
 * Vídeo #1 ao #48: Whatsapp (Devsapp) - Módulo 16 - Projeto com React Native - B7Web
 * Aplicando todos os conhecimentos adquiridos.
 * by: Vagner Pinto
 */

import React from 'react';
import {StyleSheet, View, Image, Text, TextInput, TouchableOpacity, Keyboard} from 'react-native';
import {connect} from "react-redux";
import {entrar} from "../actions/AuthActions";
import * as EmailValidator from 'email-validator';

export class SingIn extends React.Component{ //retirar o default, ele vai para o final, o redux é que será o default
    constructor(props) {
        super(props);
        console.log('construiu SingIn.');
        this.state ={
            email:'',
            senha:''
        };

        //faz o bind do comportamemto com o componente
        this.validar = this.validar.bind(this);
    }

    componentDidUpdate() {
        if(this.props.status === 1) {
            Keyboard.dismiss();
            this.props.navigation.reset({
                index: 0,
                routes: [{name: 'Home'}]
            });
        }
    }

    validar(){
        if(this.state.email === '' || this.state.senha === ''){
            alert('Por favor, preencha todos os campos.');
        }else if(EmailValidator.validate(this.state.email)){
            this.props.entrar(this.state.email, this.state.senha);
        }else{
            alert('Digite um email válido.');
        }
    }


    render(){
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Image style={styles.image} source={require('../../assets/images/icon_playstore.png')} />
                </View>
                <View style={styles.body}>
                    <Text style={styles.textLabel}>Email:</Text>
                    <TextInput style={styles.input} onChangeText={(email)=>this.setState({email})} />
                    <Text style={styles.textLabel}>Senha:</Text>
                    <TextInput secureTextEntry={true} style={styles.input} onChangeText={(senha)=>{this.setState({senha})}} />
                    <TouchableOpacity style={styles.buttonEntrar} onPress={this.validar}>
                        <Text style={styles.textButton}>Entrar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonCadastrar} onPress={() => this.props.navigation.navigate('SignUp')}>
                        <Text style={styles.textButton}>Cadastrar</Text>
                    </TouchableOpacity>
                </View>
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
const SignInConnect = connect(mapStateToProps, {entrar})(SingIn); //conecta os dois componentes (suas props)
export default SignInConnect; //exporta o componente como padrão

const styles = StyleSheet.create({
    container:{
        margin:10,
        flex:1
    },
    body:{
        margin:10,
        flex:3
    },
    header:{
        margin:10,
        flex:1,
        justifyContent:'center',
        alignItems: 'center'
    },
    image:{
        width:120,
        height:120
    },
    input:{
        height:40,
        borderWidth:1,
        borderColor:'#2da832',
        marginBottom:10
    },
    buttonEntrar: {
        alignItems: "center",
        backgroundColor: "#ffe51f",
        padding:10,
        margin:10
    },
    buttonCadastrar: {
        alignItems: "center",
        backgroundColor: "#2da832",
        padding:10,
        margin:10
    },
    textButton:{
        fontSize:18,
        color:'#ffffff'
    },
    textLabel:{
        color:'#003c00'
    }
});
