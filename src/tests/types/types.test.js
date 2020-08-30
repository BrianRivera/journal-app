import '@testing-library/jest-dom';
import { types } from '../../types/types';

describe('Test en objeto', () => {

    const testTypes = {
        login: '[Auth] Login',
        logout: '[Auth] Logout',

        uiSetError: '[UI] Set Error',
        uiERemoveError: '[UI] Remove Error',

        uiStartLoading: '[UI] Start loading',
        uiFinishLoading: '[UI] Finish loading',

        notesAddNew: '[Notes] New note',
        notesActive: '[Notes] Set active note',
        notesLoad: '[Notes] Load notes',
        notesUpdated: '[Notes] Updated note',
        notesFileUrl: '[Notes] Update image url',
        notesDelete: '[Notes] Delete note',
        notesLogoutCleaning: '[Notes] Logout Cleaning',
    }

    test('objeto types', () => {
        expect(testTypes).toEqual(types);
    })


})