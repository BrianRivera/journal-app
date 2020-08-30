import '@testing-library/jest-dom'
import React from 'react'
import { mount } from 'enzyme'
import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router-dom'
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { RegisterScreen } from '../../../components/auth/RegisterScreen'
import { types } from '../../../types/types'



const middleware = [thunk];
const mockStore = configureStore(middleware);

const initState = {
    auth: {},
    ui: {
        loading:false,
        msgError: null
    }
};

let store = mockStore(initState);
// store.dispatch = jest.fn();


const wrapper = mount(
    <Provider store={store}>
        <MemoryRouter>
            <RegisterScreen></RegisterScreen>
        </MemoryRouter>
    </Provider>
)

describe('pruebas en RegisterScreen', () => {

    test('debe mostrarse correctamente', () => {
        expect(wrapper).toMatchSnapshot();
    });

    test('debe de hacer el dispatch de la accion respectiva', () => {
        const emailField = wrapper.find('input[name="email"]');

        emailField.simulate('change',{
            target: {
                value: '',
                name: 'email'
            }
        });

        wrapper.find('form').simulate('submit',{
            preventDefault(){}
        });
        const action = store.getActions();

        expect(action[0]).toEqual({
            type:types.uiSetError,
            payload: 'Email is not valid'
        })
    });
    
    //simular o fingir informacion precargada en un componente
    test('debe d emostrar la caja de alerta con el error', () => {
        const initState = {
            auth: {},
            ui: {
                loading:false,
                msgError: 'Email no es correcto'
            }
        };
        
        const store = mockStore(initState);
        // store.dispatch = jest.fn();
        
        
        const wrapper = mount(
            <Provider store={store}>
                <MemoryRouter>
                    <RegisterScreen></RegisterScreen>
                </MemoryRouter>
            </Provider>
        )


        expect(wrapper.find('.auth__alert-error').exists()).toBe(true)
        expect(wrapper.find('.auth__alert-error').text().trim()).toBe(initState.ui.msgError)
    })
    

    
})
