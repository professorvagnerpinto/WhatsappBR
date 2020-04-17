/**
 * Vídeo #1 ao #48: Whatsapp (Devsapp) - Módulo 16 - Projeto com React Native - B7Web
 * Aplicando todos os conhecimentos adquiridos.
 * by: Vagner Pinto
 */

import React from 'react';
import {StyleSheet, View, FlatList} from 'react-native';
import {connect} from "react-redux";
import {buscarChats, setActiveChat} from '../actions/ChatActions';
import ChatItem from '../components/ChatItem';


export class ChatsTab extends React.Component{ //retirar o default, ele vai para o final, o redux é que será o default
    constructor(props) {
        super(props);
        console.log('construiu ChatsTab.');

        //busca todos os chats do usuário logado
        this.props.buscarChats(this.props.uid);

        //faz o bind do comportamemto com o componente
        this.chatOnClick = this.chatOnClick.bind(this);
    }

    chatOnClick(item){
        this.props.setActiveChat(item.key);
        this.props.navigation.navigate('Chat',{title:item.title});
    }

    render(){
        return(
            <View style={styles.container}>
                <FlatList
                    data={this.props.chats}
                    renderItem={({item})=><ChatItem data={item} onPress={this.chatOnClick} />}
                />
            </View>
        );
    }
}
const mapStateToProps = (state) => { //mapeia os states do reducer para as props desse componente
    return {
        status:state.auth.status,
        uid:state.auth.uid,
        chats:state.chat.chats
    };
};
const ChatsTabConnect = connect(mapStateToProps, {buscarChats, setActiveChat})(ChatsTab); //conecta os dois componentes (suas props)
export default ChatsTabConnect; //exporta o componente como padrão

const styles = StyleSheet.create({
    container:{
        flex:1
    }
});
