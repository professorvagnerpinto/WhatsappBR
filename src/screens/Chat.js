

import React from 'react';
import {
    StyleSheet,
    KeyboardAvoidingView,
    Platform,
    View,
    FlatList,
    TextInput,
    TouchableHighlight,
    Image,
    ActivityIndicator,
} from 'react-native';
import {connect} from 'react-redux';
import MessageItem from '../components/MessageItem';
import {monitorChatOff, monitorChatOn, sendMessage} from '../actions/ChatActions';

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
            loading:true,
            type:'text'
        };

        //faz o bind do comportamemto com o componente
        this.sendMsg = this.sendMsg.bind(this);
        this.pickerImage = this.pickerImage.bind(this);
    }

    componentDidMount(){
        this.props.monitorChatOn(this.props.activeChat, ()=>{
            this.setState({loading:false});
        });
    }

    componentWillUnmount(){
        this.props.monitorChatOff(this.props.activeChat);
    }

    sendMsg(){
        let s = this.state;
        let msg = '';
        //TODO tirar o bug do zero, como em 17:09 (retirado, falta testar em um horário apropriado)
        let cDate = new Date;
        //antes formata para evitar 0x como x
        let minute = (cDate.getMinutes() < 10 ? '0'+cDate.getMinutes() : cDate.getMinutes());
        let second = (cDate.getSeconds() < 10 ? '0'+cDate.getSeconds() : cDate.getSeconds());
        //YYYY-MM-DD HH:ii:SS
        let currentDate = cDate.getFullYear() + '-' + (cDate.getMonth()+1)  + '-' + cDate.getDate() + ' ' + cDate.getHours() + ':' + minute + ':' + second;
        switch(s.type) {
            case 'text':
                msg = {
                    date:currentDate,
                    msg:this.state.msg,
                    type:'text',
                    userUid:this.props.uid, //usuário na sessão
                };
                break;
            case 'image':
                msg = {
                    date:currentDate,
                    msg:this.state.msg,
                    type:'image',
                    userUid:this.props.uid, //usuário na sessão
                    url:'https://urlParaImagemNoStorage'
                };
                break;
        }
        this.props.sendMessage(this.state.msg, this.props.activeChat);
        s.msg = '';
        this.setState(s);
    }

    pickerImage(){
        alert('pegar imagem aqui.');
    }

    render(){
        //para resolver o problema do teclado sobre as mensagens no ios
        let areaBehavior = Platform.select({ios:'padding', android:null});
        let areaOffset = Platform.select({ios:64, android:null});

        return (
            <KeyboardAvoidingView style={styles.container} behavior={areaBehavior} keyboardVerticalOffset={areaOffset}>
                {this.state.loading && <ActivityIndicator size="large" color="#104eb8"/>}
                <FlatList
                    ref={(ref)=>{this.flatArea = ref}}
                    onContentSizeChange={()=>{this.flatArea.scrollToEnd({animated:true})}}
                    onLayout={()=>{this.flatArea.scrollToEnd({animated:true})}}
                    style={styles.chatArea}
                    data={this.props.messages}
                    renderItem={({item})=><MessageItem data={item} />}
                />
                <View style={styles.sendArea}>
                    <TouchableHighlight underlayColor={'#ffe51f'} style={styles.imagePickerButton} onPress={this.pickerImage}>
                        <Image source={require('../../assets/images/icon_image_picker.png')} style={styles.sendButtonImage} />
                    </TouchableHighlight>
                    <TextInput value={this.state.msg} style={styles.sendInput} onChangeText={(msg)=>{this.setState({msg})}} />
                    <TouchableHighlight underlayColor={'#2da832'} style={styles.sendButton} onPress={this.sendMsg}>
                        <Image source={require('../../assets/images/icon_send.png')} style={styles.sendButtonImage} />
                    </TouchableHighlight>
                </View>
            </KeyboardAvoidingView>
        );
    }
}
const mapStateToProps = (state) => { //mapeia os states do reducer para as props desse componente
    return {
        activeChat:state.chat.activeChat,
        uid:state.auth.uid,
        chats:state.chat.chats,
        messages:state.chat.activeChatMessages
    };
};
const ChatConnect = connect(mapStateToProps, {sendMessage, monitorChatOn, monitorChatOff})(Chat); //conecta os dois componentes (suas props)
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
    imagePickerButton:{
        height:40,
        width:40,
    },
    sendButtonImage:{
        height:40,
        width:40,
    }
});
