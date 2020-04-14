/**
 * Vídeo #1 ao #48: Whatsapp (Devsapp) - Módulo 16 - Projeto com React Native - B7Web
 * Aplicando todos os conhecimentos adquiridos.
 * by: Vagner Pinto
 */

import {combineReducers} from 'redux';
import AuthReducer from './AuthReducer';
import ChatReducer from './ChatReducer';

const Reducers = combineReducers({
    auth:AuthReducer,
    chat:ChatReducer
});
export default Reducers; //utilizado em App.js
