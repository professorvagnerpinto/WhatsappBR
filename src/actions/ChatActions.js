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
                    if(userUid != childItem.key){
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

export const createChat = (userUid1, userUid2) => {
    return (dispatch) => {
        //criando o chat
        let pathChatUid = firebase.database().ref('chats').push();
        pathChatUid.child('members').child(userUid1).set({
            id:userUid1
        });
        pathChatUid.child('members').child(userUid2).set({
            id:userUid2
        });

        //associando o chat aos membros
        firebase.database().ref('users').child(userUid1).child('chats').child(pathChatUid.key).set({
            id:pathChatUid.key
        });
        firebase.database().ref('users').child(userUid2).child('chats').child(pathChatUid.key).set({
            id:pathChatUid.key
        });
    };
};
