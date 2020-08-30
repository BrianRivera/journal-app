import '@testing-library/jest-dom'
import React from 'react'
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { JournalEntry } from '../../../components/journal/JournalEntry';
import { activeNote } from '../../../actions/notes';


const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const initState = {
    auth: {
        uid: '1',
        name: 'brian'
    },
    ui: {
        loading:false,
        msgError: null
    },
    notes: {
        active: null,
        notes: []
    }
    };

let store = mockStore(initState)
store.dispatch = jest.fn();


const note = {
    id: 10,
    date:0,
    title: 'holamundi',
    body:'mundo',
    url: 'https://algunlugar.com/foto.jpg'
}

const wrapper = mount(
    <Provider store={store}>
        <JournalEntry {...note}></JournalEntry>
    </Provider>
)






describe('pruebas en JournalEntry', () => {


    test('debe de mostrarse correctamente', () => {
        expect(wrapper).toMatchSnapshot();
    });

    test('debe de activar la nota', () => {
        wrapper.find('.journal__entry').prop('onClick')();

        expect(store.dispatch).toHaveBeenCalledWith(
            activeNote(note.id, {...note})
        );
    })
    
    
    
})
