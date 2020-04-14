

import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {connect} from 'react-redux';

export class Chat extends React.Component{ //retirar o default, ele vai para o final, o redux é que será o default

    constructor(props) {
        super(props);
        console.log('Construiu Chat');
    }

    render(){
        return (
            <Text>Screen Chat {this.props.activeChat}</Text>
        );
    }
}
const mapStateToProps = (state) => { //mapeia os states do reducer para as props desse componente
    return {
        activeChat:state.chat.activeChat
    };
};
const ChatConnect = connect(mapStateToProps, {})(Chat); //conecta os dois componentes (suas props)
export default ChatConnect; //exporta o componente como padrão

const styles = StyleSheet.create({
    container:{
        flex:1
    }
});
