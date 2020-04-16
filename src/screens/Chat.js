

import React from 'react';
import {StyleSheet, View, FlatList, TextInput, TouchableHighlight, Image} from 'react-native';
import {connect} from 'react-redux';
import MensagemItem from '../components/MensagemItem';

export class Chat extends React.Component{ //retirar o default, ele vai para o final, o redux é que será o default

    static navigationOptions = (navigation) => {
        return {
            title: navigation.route.params.title,
            headerShown: true,
            headerStyle:{backgroundColor:'#2da832'},
            headerTitleStyle:{color:'#ffe51f'}
        };
    };

    constructor(props) {
        super(props);
        console.log('Construiu Chat');
        this.state = {
            msg:'',
            msgs:[
                {key:1, userUid:1, date:'16/04/2020', msg:'Oi, tudo bem?'},
                {key:2, userUid:this.props.uid, date:'16/04/2020', msg: 'Tudo, e você?'},
                {key:2, userUid:this.props.uid, date:'16/04/2020', msg: 'Qq manda?'},
                {key:3, userUid:1, date:'16/04/2020', msg: 'Vai na festa hoje? Vai estar toda turma lá. Disseram que vão chegar cedo.'}]
        };
    }

    render(){
        return (
            <View style={styles.container}>
                <FlatList
                    style={styles.chatArea}
                    data={this.state.msgs}
                    renderItem={({item})=><MensagemItem data={item} />}
                />
                <View style={styles.sendArea}>
                    <TextInput ref={input => { this.textInputMsg = input }} style={styles.sendInput} onChangeText={(msg)=>{this.setState({msg})}} />
                    <TouchableHighlight underlayColor={'#2da832'} style={styles.sendButton} onPress={()=>{alert('msg= ' + this.state.msg);this.textInputMsg.clear();}} >
                        <Image source={require('../../assets/images/icon_send.png')} style={styles.sendButtonImage} />
                    </TouchableHighlight>
                </View>
            </View>
        );
    }
}
const mapStateToProps = (state) => { //mapeia os states do reducer para as props desse componente
    return {
        activeChat:state.chat.activeChat,
        uid:state.auth.uid,
        chats:state.chat.chats
    };
};
const ChatConnect = connect(mapStateToProps, {})(Chat); //conecta os dois componentes (suas props)
export default ChatConnect; //exporta o componente como padrão

const styles = StyleSheet.create({
    container:{
        flex:1
    },
    chatArea:{
        flex:1
    },
    sendArea:{
        height:50,
        flexDirection:'row',
        alignItems:'center',
        borderTopWidth:2,
        borderTopColor:'#2da832'
    },
    sendInput:{
        flex:1,
        borderBottomWidth:1,
        marginBottom:2,
        borderBottomColor:'#2da832'
    },
    sendButton:{
        height:50,
        width:50,
        justifyContent:'center',
        alignItems:'center'
    },
    sendButtonImage:{
        height:40,
        width:40,
    }
});
