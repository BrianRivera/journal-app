import '@testing-library/jest-dom'
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk'
import { startNewNote, startLoadingNote, startSaveNote, startUploading } from '../../actions/notes';
import { types } from '../../types/types';
import { db } from '../../firebase/firebase-config';
import { fileUpload } from '../../helpers/fileUpload';


jest.mock('../../helpers/fileUpload', () => ({
    fileUpload: jest.fn(() => {
        return 'https://asd.com/cosa.jpg'
    })
}))

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {
    auth: {
        uid: 'TESTING'
    },
    notes: {
        active: {
            id: '72WKPOPCo1c9YGwVMJKu',
            title: 'hola',
            body: 'mundo'
        }
    }
}



let store = mockStore(initState);


describe('Pruebas en notes', () => {


    beforeEach(() => {
        store.clearActions();
    });

    test('Debe de crear una nueva nota en startNewNote', async() => {
        await store.dispatch(startNewNote());
        const actions = store.getActions();

        expect(actions[0]).toEqual({
            type: types.notesActive,
            payload: {
                id: expect.any(String),
                title: '',
                body: '',
                date: expect.any(Number)
            }
        });
        expect(actions[1]).toEqual({
            type: types.notesAddNew,
            payload: {
                id: expect.any(String),
                title: '',
                body: '',
                date: expect.any(Number)
            }
        });

        const docId = actions[1].payload.id;
        await db.doc(`TESTING/journal/notes/${docId}`).delete();

    });

    test('startLoading debe cargar las notas', async() => {
        await store.dispatch(startLoadingNote('TESTING'));

        const actions = store.getActions();

        expect(actions[0]).toEqual({
            type: types.notesLoad,
            payload: expect.any(Object)
        });

        const expected = {
            id: expect.any(String),
            title: expect.any(String),
            body: expect.any(String),
            date: expect.any(Number)
        }

        expect(actions[0].payload[0]).toMatchObject(expected);

    });

    test('startSaveNote debe de actualizar la nota', async() => {

        const note = {
            id: 'tBjXSFaZVFZeW1WucVu2',
            title: 'Titulo prueba',
            body: 'body test'
        };
        await store.dispatch(startSaveNote(note));

        const actions = store.getActions();

        expect(actions[0].type).toBe(types.notesUpdated);

        const docRef = await db.doc(`/TESTING/journal/notes/${note.id}`).get();
        expect(docRef.data().title).toBe(note.title)
    });

    test('startUploading dev ede actualizar el url de entry', async() => {

        const file = new File([], 'foto.jpg');
        await store.dispatch(startUploading(file));

        const docRef = await db.doc(`/TESTING/journal/notes/72WKPOPCo1c9YGwVMJKu`).get();
        expect(docRef.data().url).toBe('https://asd.com/cosa.jpg');
    })





})