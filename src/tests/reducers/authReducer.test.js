import '@testing-library/jest-dom'
import { authReducer } from '../../reducers/authReducer';
import { types } from '../../types/types';



describe('Pruebas en authReducer', () => {

    test('recive el login', () => {

        var payload = {
            uid: 'sldkfjasñdfok',
            name: 'brian'
        }

        const resp = authReducer({}, {
            type: types.login,
            payload: {
                uid: 'sldkfjasñdfok',
                displayName: 'brian'
            }
        });
        expect(resp).toEqual(payload);

    });

    test('deslogea', () => {
        const resp = authReducer({}, {
            type: types.logout
        });
        expect(resp).toEqual({});
    })

    test('default', () => {
        const resp = authReducer({}, { type: types.notesDelete });

        expect(resp).toEqual({});
    })




})