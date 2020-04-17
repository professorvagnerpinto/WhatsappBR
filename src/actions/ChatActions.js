/**
 * Vídeo #1 ao #48: Whatsapp (Devsapp) - Módulo 16 - Projeto com React Native - B7Web
 * Aplicando todos os conhecimentos adquiridos.
 * by: Vagner Pinto
 */

import firebase from '../services/FirebaseConnetion';

export const buscarContatos = (userUid) => {
    return (dispatch) => {
        firebase.database().ref('users')
            .orderByChild('nome')
            .once('value')
            .then((dataSnapshot)=>{
                let users=[];
                dataSnapshot.forEach((childItem)=>{
                    if(userUid !== childItem.key){
                        users.push({
                            key:childItem.key,
                            nome:childItem.val().nome
                        });
                    }
                });
                dispatch({
                    type:'setContactList',
                    payload:{
                        users:users
                    }
                });
        });
    };
};

export const criarChat = (user1key, user2key) => {
    return (dispatch) => {
        //criando o chat
        let pathChatUid = firebase.database().ref('chats').push();
        pathChatUid.child('members').child(user1key).set({
            id:user1key
        });
        pathChatUid.child('members').child(user2key).set({
            id:user2key
        });

        //associando o chat ao membro
        firebase.database().ref('users').child(user2key).once('value').then((dataSnapshot) => {
            firebase.database().ref('users').child(user1key).child('chats').child(pathChatUid.key).set({
                id:pathChatUid.key,
                title:dataSnapshot.val().nome,
                uid:user2key
            });
        });
        firebase.database().ref('users').child(user1key).once('value').then((dataSnapshot) => {
            firebase.database().ref('users').child(user2key).child('chats').child(pathChatUid.key).set({
                id:pathChatUid.key,
                title:dataSnapshot.val().nome,
                uid:user1key
            });
        });

        //atualiza o reducer com o chat ativo
        dispatch({
            type:'setActiveChat',
            payload:{
                activeChat:pathChatUid.key
            }
        });
    };
};

export const buscarChats = (userUid) => {
    return(dispatch)=>{
        firebase.database().ref('users').child(userUid).child('chats').on('value', (dataSnapshot) => {
            let chats = [];
            dataSnapshot.forEach((childItem)=>{
                chats.push({
                    key:childItem.key,
                    title:childItem.val().title,
                    uid:childItem.val().uid
                });
            });
            dispatch({
                type:'setChats',
                payload:{
                    chats:chats
                }
            });
        });
    }
};

export const setActiveChat = (itemKey) => {
    return {
        type:'setActiveChat',
        payload:{
            activeChat:itemKey
        }
    };
};

export const sendMessage = (msg, userid1, activeChat) => {
    let cDate = new Date;
    //YYYY-MM-DD HH:ii:SS
    let currentDate = cDate.getFullYear() + '-' + (cDate.getMonth()+1)  + '-' + cDate.getDate() + ' ' + cDate.getHours() + ':' + cDate.getMinutes() + ':' + cDate.getSeconds();
    firebase.database().ref('chats').child(activeChat).child('messages').push().set({
        date: currentDate,
        msg:msg,
        uid:userid1
    });

};

export const monitorChatOn = (activeChat) => {
    return (dispatch) => {
        firebase.database().ref('chats').child(activeChat).child('messages').orderByChild('date').on('value', (dataSnapshot) => {
            let messages = [];
            dataSnapshot.forEach((childItem)=>{
                messages.push({
                    key:childItem.key,
                    date:childItem.val().date,
                    msg:childItem.val().msg,
                    uid:childItem.val().uid
                });
            });
            dispatch({
                type:'activeChatMessages',
                payload:{
                    msgs:messages
                }
            });
        });
    };
};

export const monitorChatOff = (activeChat) => {
    return (dispatch) => {
        firebase.database().ref('chats').child(activeChat).child('messages').off('value');
        dispatch({
            type:'activeChatMessages',
            payload:{
                msgs:[]
            }
        });
    };
};
