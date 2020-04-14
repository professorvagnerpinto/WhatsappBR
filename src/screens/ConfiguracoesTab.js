import React from 'react';
import {Text, View, Button, Keyboard} from 'react-native';
import {connect} from "react-redux";
import {signOut} from "../actions/AuthActions";

export class ConfiguracoesTab extends React.Component{ //retirar o default, ele vai para o final, o redux é que será o default

    constructor(props) {
        super(props);
        console.log('construiu o ConfiguracoesTab.');
        //faz o bind do comportamemto com o componente
        this.sair = this.sair.bind(this);
    }

    sair(){
        this.props.signOut();
        this.props.navigation.reset({
            index:0,
            routes: [{ name: 'SignIn' }]
        });
    }

    render(){
        return(
            <View>
                <Button title='Sair' onPress={this.sair} />
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
const ConfiguracoesTabConnect = connect(mapStateToProps, {signOut})(ConfiguracoesTab); //conecta os dois componentes (suas props)
export default ConfiguracoesTabConnect; //exporta o componente como padrão
