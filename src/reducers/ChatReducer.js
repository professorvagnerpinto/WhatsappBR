/**
 * Vídeo #1 ao #48: Whatsapp (Devsapp) - Módulo 16 - Projeto com React Native - B7Web
 * Aplicando todos os conhecimentos adquiridos.
 * by: Vagner Pinto
 */

const initialState ={
    contatos: [],
    activeChat:'',
    chats:[],
    otherUserOnChat:{}
};

const ChatReducer = (state=initialState, action) => {
    if(action.type === 'setContactList'){
        return {...state, contatos:action.payload.users};
    }
    if(action.type === 'setActiveChat'){
        return {...state, activeChat:action.payload.activeChat};
    }
    if(action.type === 'setChats'){
        return {...state, chats:action.payload.chats};
    }

    return state;
};
export default ChatReducer; //utilizado em Reducers.js
