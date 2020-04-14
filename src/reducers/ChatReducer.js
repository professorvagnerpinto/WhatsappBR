/**
 * Vídeo #1 ao #48: Whatsapp (Devsapp) - Módulo 16 - Projeto com React Native - B7Web
 * Aplicando todos os conhecimentos adquiridos.
 * by: Vagner Pinto
 */

const initialState ={
    chats:[],
    contatos: []
};

const ChatReducer = (state=initialState, action) => {
    if(action.type === 'setContactList'){
        return {...state, contatos:action.payload.users};
    }

    return state;
};
export default ChatReducer; //utilizado em Reducers.js
