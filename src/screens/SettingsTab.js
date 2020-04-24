import React from 'react';
import {View, Button} from 'react-native';
import {connect} from "react-redux";
import {signOut} from "../actions/AuthActions";

export class SettingsTab extends React.Component{ //retirar o default, ele vai para o final, o redux é que será o default

    constructor(props) {
        super(props);
        console.log('construiu SettingsTab.');

        //faz o bind do comportamemto com o componente
        this.sair = this.sair.bind(this);
        this.onBackButtonPressed = this.onBackButtonPressed.bind(this);
    }

    onBackButtonPressed() { //já inscreveu o handler em ContactsTab
        //TODO rever o hardwareBackPress, o objeto this.pros.navigation não existe
        // this.props.navigation.reset({
        //     index: 0,
        //     routes: [{name: 'ChatsTab'}]
        // });
        return false;
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
const SettingsTabConnect = connect(mapStateToProps, {signOut})(SettingsTab); //conecta os dois componentes (suas props)
export default SettingsTabConnect; //exporta o componente como padrão
