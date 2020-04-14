import React from 'react';
import {View, FlatList, StyleSheet} from 'react-native';
import {connect} from "react-redux";
import {buscarContatos, criarChat} from "../actions/ChatActions";
import ContatoItem from "../components/ContatoItem";

export class ContatosTab extends React.Component{ //retirar o default, ele vai para o final, o redux é que será o default
    constructor(props) {
        super(props);
        this.props.buscarContatos(this.props.uid);
        console.log('construiu ContatosTab.');

        //faz o bind do comportamemto com o componente
        this.contatoOnClick = this.contatoOnClick.bind(this);
    }

    contatoOnClick(item){
        this.props.criarChat(this.props.uid, item.key);
        this.props.navigation.navigate('Chat');
    }

    render(){
        return(
            <View style={styles.container}>
                <FlatList style={styles.list}
                    data={this.props.contatos}
                    renderItem={({item})=><ContatoItem data={item} onPress={this.contatoOnClick} />}
                />
            </View>
        );
    }
}
const mapStateToProps = (state) => { //mapeia os states do reducer para as props desse componente
    return {
        uid:state.auth.uid,
        contatos:state.chat.contatos
    };
};
const ContatosTabConnect = connect(mapStateToProps, {buscarContatos, criarChat})(ContatosTab); //conecta os dois componentes (suas props)
export default ContatosTabConnect; //exporta o componente como padrão

const styles = StyleSheet.create({
    container:{
        flex:1
    },
    list:{
        flex:1
    }
});
