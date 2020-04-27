/**
 * Vídeo #1 ao #48: Whatsapp (Devsapp) - Módulo 16 - Projeto com React Native - B7Web
 * Aplicando todos os conhecimentos adquiridos.
 * by: Vagner Pinto
 */

import firebase from '../services/FirebaseConnetion';

export const buscarContatos = (userUid, callback) => {
    return (dispatch) => {
        firebase.database().ref('users')
            .orderByChild('nome')
            .on('value', (dataSnapshot) => {
                let users=[];
                dataSnapshot.forEach((childItem)=>{
                    if(userUid !== childItem.key){
                        users.push({
                            key:childItem.key,
                            nome:childItem.val().nome
                        });
                    }
                });
                callback(); //para tratar do loading
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
        pathChatUid.child('members').set({
            uid1:user1key,
            uid2:user2key
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

export const buscarChats = (userUid, callback) => {
    return(dispatch)=>{
        firebase.database().ref('users').child(userUid).child('chats')
            .orderByChild('title')
            .on('value', (dataSnapshot) => {
                let chats = [];
                dataSnapshot.forEach((childItem)=>{
                    chats.push({
                        key:childItem.key,
                        title:childItem.val().title,
                        uid:childItem.val().uid
                    });
                });
                callback(); //para tratar do loading
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

export const sendImage = (blob, progressCallback, successCallback) => {
    return() => { //como é assíncrono tem que colocar o callback para o redux-thunk, senão o Redux emite uma exceção
        let imageName = firebase.database().ref('chats').push().key; //apenas para gerar um uid
        let imageRef = firebase.storage().ref('images').child(imageName);
        imageRef.put(blob, {contentType:'image/jpeg'})
            .on('state_changed',
                progressCallback,
            (error)=>{
                alert('Erro: ' + error.code);
            },
            ()=>{
                imageRef.getDownloadURL().then((url)=>{
                    successCallback(url);
                });
            });
    };
};

export const sendMessage = (msg, activeChat) => {
    return () =>{ //como é assíncrono tem que colocar o callback para o redux-thunk, senão o Redux emite uma exceção
        firebase.database().ref('chats').child(activeChat).child('messages').push().set(msg);
    };
};

export const monitorChatOn = (activeChat, callback) => {
    return (dispatch) => {
        firebase.database().ref('chats').child(activeChat).child('messages').orderByChild('date').on('value', (dataSnapshot) => {
            let messages = [];
            dataSnapshot.forEach((childItem)=>{
                switch (childItem.val().type) {
                    case 'text':
                        messages.push({
                            key:childItem.key,
                            date:childItem.val().date,
                            type:childItem.val().type,
                            msg:childItem.val().msg,
                            uid:childItem.val().userUid
                        });
                        break;
                    case 'image':
                        messages.push({
                            key:childItem.key,
                            date:childItem.val().date,
                            type:childItem.val().type,
                            msg:childItem.val().msg,
                            uid:childItem.val().userUid,
                            url:childItem.val().url
                        });
                        break;
                }
            });
            callback(); //para tratar do loading
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
