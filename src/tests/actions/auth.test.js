import '@testing-library/jest-dom';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { db } from '../../firebase/firebase-config';
import { login, logout, startLogout, startLoginEmailPassword } from '../../actions/auth';
import { types } from '../../types/types';


const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {};
let store = mockStore(initState);

describe('Pruebas en action de auth', () => {

    beforeEach(() => {
        store = mockStore(initState);
    })

    test('login y logout deben de crear la acction respectiva', async() => {
        const uid = 'abc123';
        const displayName = 'Brian'

        const loginAction = login(uid, displayName);
        const logoutAction = logout();

        expect(loginAction).toEqual({
            type: types.login,
            payload: {
                uid,
                displayName
            }
        });

        expect(logoutAction).toEqual({
            type: types.logout
        })
    })

    test('debe de realizar el startLogout', async() => {
        await store.dispatch(startLogout());

        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: types.logout
        });

        expect(actions[1]).toEqual({
            type: types.notesLogoutCleaning
        });

    });

    test('should debe inicias el startLoginEmailPassword', async() => {
        await store.dispatch(startLoginEmailPassword(`test@testing.com`, `123456`));
        const actions = store.getActions();

        expect(actions[1]).toEqual({
            type: types.login,
            payload: {
                uid: 'BvBVOkiajgWgnHVLrDois0QJuZm2',
                displayName: null
            }
        })

    })




})