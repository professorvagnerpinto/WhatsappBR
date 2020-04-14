/**
 * Vídeo #1 ao #48: Whatsapp (Devsapp) - Módulo 16 - Projeto com React Native - B7Web
 * Aplicando todos os conhecimentos adquiridos.
 * by: Vagner Pinto
 */

import firebase from '../services/FirebaseConnetion';

//checa se o usuário já está logado no Firebase
export const checkLogin = () =>{
    return (dispatch) => {
        console.log('Chamou checkLogin');
        firebase.auth().onAuthStateChanged((user)=>{
            if(user){
                dispatch({
                    type:'changeUid',
                    payload:{
                        uid:user.uid //(1 = logado, valor alterado no AuthReducer, em changeUid)
                    }
                });
            }else{
                dispatch({
                    type:'changeStatus',
                    payload:{
                        status:2 //não logado
                    }
                });
            }
        });
    }
};

//logar no firebase
export const entrar = (email, senha) => {
    return (dispatch) => {
        console.log('Chamou entrar. Aguarde as chamadas assíncronas...');
        firebase.auth().signInWithEmailAndPassword(email, senha)
            .then( () => {
                console.log('Entrou, pegando o uid...');
                let uid = firebase.auth().currentUser.uid;
                dispatch({
                    type:'changeUid',
                    payload:{
                        uid:uid
                    }
                });
            })
            .catch( (error) => {
                switch (error.code) {
                    case 'auth/invalid-email':
                        alert('Email inválido.');
                        break;
                    case 'auth/user-disabled':
                        alert('Este usuário está desativado.');
                        break;
                    case 'auth/user-not-found':
                        alert('Usuário inexistente.');
                        break;
                    case 'auth/wrong-password':
                        alert('Email ou senha inválida.');
                        break;
                }
            });
    };
};

export const signOut = () => {
    return (dispatch) => {
        firebase.auth().signOut()
            .then(()=>{
                dispatch({
                    type:'changeStatus',
                    payload:{
                        status:2 //não logado
                    }
                });
            })
            .catch((error)=>{
                alert('Erro ao sair, código: ' + error.code);
            });
    };
};

//cadastrar no firebase
export const cadastrar = (name, email, senha) => {
    console.log('Chamou cadastrar. Aguarde as chamadas assíncronas...');
    return (dispatch) => {
        firebase.auth().createUserWithEmailAndPassword(email, senha)
            .then(() => {
                console.log('Criou o usuário, pegando o uid...');
                let uid = firebase.auth().currentUser.uid;
                firebase.database().ref('users').child(uid).set({
                    nome:name
                })
                    .then(() => {
                        console.log('Salvou o usuário no serviço RealtimeDatabase. Chamou o dispatch, aguarde...');
                        dispatch({
                            type:'changeUid',
                            payload:{
                                uid:uid
                            }
                        });
                    })
                    .catch((error) => {
                        console.log('Erro em cadastrar, firebase.database(), ' + error.code);
                        alert('Ops, erro. Por favor, contate nosso SAC.');
                    });
            })
            .catch((error) => {
                console.log('Erro ao criar o user firebase.' + error.code);
                switch (error.code) {
                    case 'auth/email-already-in-use':
                        alert('Email já cadastrado.');
                        break;
                    case 'auth/invalid-email':
                        alert('Email inválido.');
                        break;
                    case 'auth/operation-not-allowed':
                        alert('Problemas na comunicação. Tente mais tarde.');
                        break;
                    case 'auth/weak-password':
                        alert('Digite uma senha mais forte.');
                        break;
                    default:
                        alert('Ops, erro. Por favor, contate nosso SAC.');
                        break;
                }
            });
    };
};
