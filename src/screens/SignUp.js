/**
 * Vídeo #1 ao #48: Whatsapp (Devsapp) - Módulo 16 - Projeto com React Native - B7Web
 * Aplicando todos os conhecimentos adquiridos.
 * by: Vagner Pinto
 */

import React from 'react';
import {View, StyleSheet, Text, TextInput, TouchableOpacity, Keyboard} from 'react-native';
import {connect} from "react-redux";
import {cadastrar} from "../actions/AuthActions";
import * as EmailValidator from 'email-validator';
import PasswordValidator from 'password-validator';
import LoadingComponent from '../components/LoadingComponent';

export class SignUp extends React.Component { //retirar o default, ele vai para o final, o redux é que será o default
    constructor(props){
        super(props);
        console.log('construiu SingIn.');
        this.state ={
            nome:'',
            email:'',
            senha:'',
            confirmaSenha:'',
            loading:false
        };

        //faz o bind do comportamemto com o componente
        this.validar = this.validar.bind(this);
        this.limparForm = this.limparForm.bind(this);
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
        if(this.state.nome === '' || this.state.email === '' || this.state.senha === '' || this.state.confirmaSenha === ""){
            alert('Por favor, preencha todos os campos.');
        }else if(!EmailValidator.validate(this.state.email)){
                    alert('Digite um email válido.');
                }else if(this.state.senha === this.state.confirmaSenha){
                    let schema = new PasswordValidator(); //Create a schema
                    // Add properties to it
                    schema
                        .is().min(6)    // Minimum length 6
                        .is().max(8)    // Maximum length 8
                        .has().uppercase()    // Must have uppercase letters
                        .has().lowercase()    // Must have lowercase letters
                        .has().digits()       // Must have digits
                        .has().not().spaces() // Should not have spaces
                        .is().not().oneOf(['senha5', 'senha123']);  // Blacklist these values
                    if(schema.validate(this.state.senha)){
                        this.setState({loading:true});
                        this.props.cadastrar(this.state.nome, this.state.email, this.state.senha, ()=>{this.setState({loading:false})});
                    }
                }else{
                    alert('As senhas são diferentes. Por favor, digite-as novamente.');
                }
    }

    limparForm() {
        this.textInputNome.clear();
        this.textInputEmail.clear();
        this.textInputSenha.clear();
        this.textInputConfirmaSenha.clear();
        let s = this.state;
        s.nome = '';
        s.email = '';
        s.senha = '';
        s.confirmaSenha = '';
        this.setState(s);
    }

    render(){
        return (
            <View style={styles.container}>
                <View style={styles.body}>
                    <Text style={styles.textLabel}>Nome Completo:</Text>
                    <TextInput ref={input => { this.textInputNome = input }} style={styles.input} onChangeText={(nome) => this.setState({nome})} />
                    <Text style={styles.textLabel}>Email:</Text>
                    <TextInput ref={input => { this.textInputEmail = input }} style={styles.input} onChangeText={(email) => this.setState({email})} />
                    <Text style={styles.textLabel}>Senha:</Text>
                    <TextInput ref={input => { this.textInputSenha = input }} style={styles.input} onChangeText={(senha) => this.setState({senha})} />
                    <Text style={styles.textLabel}>Confirmar Senha:</Text>
                    <TextInput ref={input => { this.textInputConfirmaSenha = input }} style={styles.input} onChangeText={(confirmaSenha) => this.setState({confirmaSenha})} />
                    <TouchableOpacity style={styles.buttonCadastrar} onPress={this.validar} >
                        <Text style={styles.textButton}>Cadastrar</Text>
                    </TouchableOpacity>
                </View>
                <LoadingComponent visible={this.state.loading} />
            </View>
        );
    }
}
const mapStateToProps = (state) => { //mapeia os states do reducer para as props desse componente
    return {
        status:state.auth.status
    };
};
const SignUpConnect = connect(mapStateToProps, {cadastrar})(SignUp); //conecta os dois componentes (suas props)
export default SignUpConnect; //exporta o componente como padrão

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
    buttonCadastrar: {
        alignItems: "center",
        backgroundColor: "#2da832",
        padding:10,
        margin:10
    },
    textButton:{
        fontSize:16,
        color:'#ffffff'
    },
    textLabel:{
    color:'#003c00'
    }
});
