

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
import ImagePicker from 'react-native-image-picker';
import RNFetchBlob from 'react-native-fetch-blob';
import {connect} from 'react-redux';
import MessageItem from '../components/MessageItem';
import {monitorChatOff, monitorChatOn, sendMessage, sendImage} from '../actions/ChatActions';


window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
window.Blob = RNFetchBlob.polyfill.Blob;

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
            type:'image',
            progress:0
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

    sendMsg(urlImage){ //parâmetro utilizado para type='image'
        let s = this.state;
        let msg = '';
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
                    url:urlImage
                };
                break;
        }
        this.props.sendMessage(msg, this.props.activeChat);
        s.msg = '';
        this.setState(s);
    }

    pickerImage(){
        ImagePicker.showImagePicker({}, (image) => {
            if(image.uri){
                let uri = image.uri.replace('file://', '');
                RNFetchBlob.fs.readFile(uri, 'base64')
                    .then((data)=>{
                        return RNFetchBlob.polyfill.Blob.build(data, {type:'image/jpeg;BASE64'});
                    })
                    .then((blob)=>{
                        this.props.sendImage(
                            blob,
                            (dataSnapshot)=>{
                                //TODO há um bug no dataSnapshot.bytesTransferred, rever isso.
                                let s = this.state;
                                console.log('dataSnapshot.bytesTransferred= ' + dataSnapshot.bytesTransferred);
                                console.log('dataSnapshot.totalBytes= ' + dataSnapshot.totalBytes);
                                s.progress = (dataSnapshot.bytesTransferred / dataSnapshot.totalBytes) * 100;
                                console.log('s.progress= ' + s.progress);
                                this.setState(s);
                            },
                            (urlImage)=>{
                                let s = this.state;
                                s.progress = 0;
                                this.setState(s);
                                this.sendMsg(urlImage);
                        });
                    })
            }
        })
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
                {this.state.progress > 0 &&
                    <View style={styles.imageProgressArea}>
                        <View style={[{width:this.state.progress + '%'} , styles.imgProgressBar]} />
                    </View>
                }
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
const ChatConnect = connect(mapStateToProps, {sendMessage, monitorChatOn, monitorChatOff, sendImage})(Chat); //conecta os dois componentes (suas props)
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
    },
    imageProgressArea:{
        height:10
    },
    imgProgressBar:{
        height:10,
        backgroundColor:'#104eb8'
    }
});
