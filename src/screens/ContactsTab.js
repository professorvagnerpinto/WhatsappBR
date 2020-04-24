import React from 'react';
import {View, FlatList, StyleSheet, ActivityIndicator, BackHandler} from 'react-native';
import {connect} from "react-redux";
import {buscarContatos, criarChat, setActiveChat} from '../actions/ChatActions';
import ContactItem from "../components/ContactItem";

export class ContactsTab extends React.Component{ //retirar o default, ele vai para o final, o redux é que será o default
    constructor(props) {
        super(props);
        console.log('construiu ContactsTab.');
        this.state = {
            loading:true
        };

        //faz o bind do comportamemto com o componente
        this.contatoOnClick = this.contatoOnClick.bind(this);
        this.onBackButtonPressed = this.onBackButtonPressed.bind(this);
    }

    componentDidMount(){
        //busca todos os contatos do usuário logado
        this.props.buscarContatos(this.props.uid, ()=>{
            this.setState({loading:false});
        });
        BackHandler.addEventListener('hardwareBackPress', this.onBackButtonPressed);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.onBackButtonPressed);
    }

    onBackButtonPressed() {
        //TODO rever o hardwareBackPress, o objeto this.pros.navigation não existe
        // this.props.navigation.reset({
        //     index: 0,
        //     routes: [{name: 'ChatsTab'}]
        // });
        return false;
    }

    contatoOnClick(item){
        let flag = true;
        let ActiveChat='';
        this.props.chats.forEach( (chat) => {
            if(chat.uid === item.key){
                flag = false;
                ActiveChat = chat.key;
            }
        });
        if(flag){
            this.props.criarChat(this.props.uid, item.key);
            this.props.navigation.navigate('Chat', {title:item.nome});
        }else{
            this.props.setActiveChat(ActiveChat);
            this.props.navigation.navigate('Chat',{title:item.nome});
        }
    }

    render(){
        return(
            <View style={styles.container}>
                {this.state.loading && <ActivityIndicator size="large" color="#104eb8"/>}
                <FlatList style={styles.list}
                    data={this.props.contatos}
                    renderItem={({item})=><ContactItem data={item} onPress={this.contatoOnClick} />}
                />
            </View>
        );
    }
}
const mapStateToProps = (state) => { //mapeia os states do reducer para as props desse componente
    return {
        uid:state.auth.uid,
        contatos:state.chat.contatos,
        chats:state.chat.chats
    };
};
const ContactsTabConnect = connect(mapStateToProps, {buscarContatos, criarChat, setActiveChat})(ContactsTab); //conecta os dois componentes (suas props)
export default ContactsTabConnect; //exporta o componente como padrão

const styles = StyleSheet.create({
    container:{
        flex:1
    },
    list:{
        flex:1
    }
});
