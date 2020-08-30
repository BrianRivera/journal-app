import '@testing-library/jest-dom'
import React from 'react'
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { NotesScreen } from '../../../components/notes/NotesScreen';
import { activeNote } from '../../../actions/notes';

jest.mock(`../../../actions/notes`,()=>({
    activeNote: jest.fn(),
    startDeleting: jest.fn()
}));




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
        active: {
            id:123,
            title: 'hola',
            body: 'mundo',
            date: 0
        },
        notes: []
    }
    };

let store = mockStore(initState)
store.dispatch = jest.fn();


const wrapper = mount(
    <Provider store={store}>
        <NotesScreen></NotesScreen>
    </Provider>
)





describe('notes screen testing', () => {


    test('debe de mosrtarse correctamente', () => {
        expect(wrapper).toMatchSnapshot();
    });

    test('debe de disparar el ativeNote', () => {
        
        wrapper.find('input[name="title"]').simulate('change',{
            target: {
                name: 'title',
                value: 'hola de nuevo'
            }
        });

        expect(activeNote).toHaveBeenLastCalledWith(
            123,
            {
                body:'mundo',
                title: 'hola de nuevo',
                id: 123,
                date: 0

            }
        )
    })
    
    
    
})
