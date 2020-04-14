

import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {connect} from 'react-redux';
import {buscarMembros} from '../actions/ChatActions';

export class Chat extends React.Component{ //retirar o default, ele vai para o final, o redux é que será o default

    constructor(props) {
        super(props);
        console.log('Construiu Chat');
        this.props.buscarMembros(this.props.activeChat, this.props.uid);
    }

    render(){
        return (
            <View style={styles.container}>
                <Text>Screen Chat {this.props.activeChat}</Text>
                <Text>User {this.props.otherUserOnChat}</Text>
            </View>
        );
    }
}
const mapStateToProps = (state) => { //mapeia os states do reducer para as props desse componente
    return {
        uid:state.auth.uid,
        activeChat:state.chat.activeChat,
        otherUserOnChat:state.chat.otherUserOnChat
    };
};
const ChatConnect = connect(mapStateToProps, {buscarMembros})(Chat); //conecta os dois componentes (suas props)
export default ChatConnect; //exporta o componente como padrão

const styles = StyleSheet.create({
    container:{
        flex:1
    }
});
