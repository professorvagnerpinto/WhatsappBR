/**
 *  Classe utilizada para encapsular o acesso aos serviços do Firebase.
 *  by: Vagner Pinto
 */

import firebase from 'firebase';

//códigos de acesso aos serviços do Firebase
const firebaseConfig = {
    /*
        Coloque aqui as credenciais do teu projeto no Firebase.
     */

};

//inicializa o serviço
if (!firebase.apps.length) { //antes testa se ele já não foi iniciado
    firebase.initializeApp(firebaseConfig);
}

export default firebase;
