import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { Link } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';
import validator from 'validator';
import { setError, removeError } from '../../actions/ui';
import { startRegisterWithEmailPasswordName } from '../../actions/auth';

export const RegisterScreen = () => {

    const dispatch = useDispatch();
    const {msgError} = useSelector( state => state.ui );

    const [values, handleInputChange] = useForm({
        name: 'elBrian',
        email: 'bridsdan@gmaisdsl.com',
        password: '123456',
        password2: '123456'
    });

    const {name,email,password,password2} = values;

    const handleRegister = (e) => {
        e.preventDefault();
        if (isFormValid()) {
            dispatch(startRegisterWithEmailPasswordName(email, password, name))
            
        }
    }

    const isFormValid = (params) => {
        if (name.trim().length === 0) {
            dispatch(setError('Name is requiered'));
            return false;
        }else if(!validator.isEmail(email)){
            dispatch(setError('Email is not valid'));
            return false;
        }else if (password !== password2 || password.length < 5) {
            dispatch(setError('Password should be at least 6 characters and match'));
            return false;
        }
        dispatch(removeError());
        return true;
    }

    return (
        <>
        <h3 className="auth__title">Register</h3>
        <form onSubmit={handleRegister}
        className="animate__animated animate__fadeIn animate__faster"
        >

        {(msgError)&&
        <div className="auth__alert-error">{msgError}</div>
        }


        <input
            type="text"
            placeholder="name"
            name="name"
            className="auth__input"
            autoComplete="off"
            value={name}
            onChange={handleInputChange}
            />

            <input
            type="text"
            placeholder="email"
            name="email"
            className="auth__input"
            autoComplete="off"
            value={email}
            onChange={handleInputChange}
            />

            <input
            type="password"
            placeholder="password"
            name="password"
            className="auth__input"
            autoComplete="off"
            value={password}
            onChange={handleInputChange}
            />

            <input
            type="password"
            placeholder="Confirm password"
            name="password2"
            className="auth__input"
            autoComplete="off"
            value={password2}
            onChange={handleInputChange}
            />

            <button
            type="submit"
            className="btn btn-primary btn-block  mb-5"
            >Register</button>

            <Link to="/auth/login" className="link">Already registered?</Link>
        </form>
        
    </>
    )
}