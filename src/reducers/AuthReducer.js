/**
 * Vídeo #1 ao #48: Whatsapp (Devsapp) - Módulo 16 - Projeto com React Native - B7Web
 * Aplicando todos os conhecimentos adquiridos.
 * by: Vagner Pinto
 */

const initialState = {
    email:'',
    senha:'',
    status:0,
    uid:'',
    signUpSuccess:0,
    signUpError:{}
};

const AuthReducer = (state=initialState, action) => {
    if(action.type === 'changeStatus'){
        return {...state, status:action.payload.status};
    }
    if(action.type === 'changeUid'){
        return {...state, status:1, uid:action.payload.uid};
    }

    return state;
};
export default AuthReducer; //utilizado em Reducers.js
