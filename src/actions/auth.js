import { firebase, googleAuthProvider } from '../firebase/firebase-config';
import { types } from "../types/types";
import { startLoading, finishLoading } from './ui';
import Swal from 'sweetalert2';
import { notesLogoutCleaning } from './notes';

export const startLoginEmailPassword = (email, password) => {
    //se pueden hacer varios dispatch
    return (dispatch) => {
        dispatch(
            startLoading()
        )
        return firebase.auth().signInWithEmailAndPassword(email, password)
            .then(({ user }) => {
                dispatch(
                    login(user.uid, user.displayName)
                )
                dispatch(
                    finishLoading()
                )
            }).catch(e => {
                dispatch(
                    finishLoading()
                )
                Swal.fire('Error', e.message, 'error');
            })

    }
}

export const startRegisterWithEmailPasswordName = (email, password, name) => {
    return (dispatch) => {
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(async({ user }) => {
                await user.updateProfile({ displayName: name })

                dispatch(
                    login(user.uid, user.displayName)
                )
            }).catch(e => {
                Swal.fire('Error', e.message, 'error');
            })
    }
}


export const startGoogleLogin = () => {
    return (dispatch) => {
        firebase.auth().signInWithPopup(googleAuthProvider)
            .then(({ user: { uid, displayName } }) => {
                dispatch(
                    login(uid, displayName)

                )
            })
    }
}

export const login = (uid, displayName) => ({
    type: types.login,
    payload: {
        uid,
        displayName
    }
});

export const startLogout = () => {

    return async(dispatch) => {

        await firebase.auth().signOut();

        dispatch(logout());
        dispatch(notesLogoutCleaning());
    }

}


export const logout = () => ({
    type: types.logout
});





/*

# Tarea

Bloquear el botón de login cuando está en el proceso de autenticación.

Pasos:

1. Crear dos tipos en nuestros types.js
    uiStartLoading: '[UI] Start loading'
    uiFinishLoading: '[UI] Finish loading'
    ------------------------------------------------------

2. Crear dos acciones que modifiquen nuestro state en el uiReducer (no reciben argumentos)
    uiStartLoading: debe de colocar la propiedad loading en true 
    uiFinishLoading: debe de colocar la propiedad loading en false

    Esas acciones tendrán el nombre de startLoading y finishLoading respectivamente
    ---------------------------------------------------------

3. Las acciones de startLoading y finishLoading serán despachadas únicamente en la acción:
    startLoginEmailPassword
        Tan pronto la acción es creada, debe de disparar la acción de startLoading
        Cuando se resuelve la petición de Firebase de autenticación con éxito o error, deben de
        disparar la acción finisLoading

4. En el <LoginScreen />, deben de bloquear el botón de Login, añadiendo la propiedad:
    disabled={ loading }

    Donde loading es la propiedad del state ui.loading.


5. Mucha suerte!
*/