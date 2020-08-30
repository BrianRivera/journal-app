import React, { useEffect, useState } from 'react'
// import { firebase } from '../firebase/firebase-config';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
  } from "react-router-dom";

import {useDispatch} from 'react-redux';
import { AuthRouter } from './AuthRouter';
import { JournalScreen } from '../components/journal/JournalScreen';
import { firebase } from '../firebase/firebase-config';
import { login } from '../actions/auth';
import {PublicRoute} from './PublicRoute'
import { PrivateRoute } from './PrivateRoute';
import { loadNotes } from '../helpers/loadNotes';
import { setNotes, startLoadingNote } from '../actions/notes';

export const AppRouter = () => {

    const dispatch = useDispatch();
    const [checking, setChecking] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    useEffect(() => {
        firebase.auth().onAuthStateChanged(async(user)=>{
            if (user?.uid) {
                dispatch(login(user.uid, user.displayName))
                setIsLoggedIn(true);
                dispatch(startLoadingNote(user.uid));

            }else{
                setIsLoggedIn(false);
            }

            setChecking(false);
        })
    }, [dispatch,setChecking ]);

    if (checking) {
        return (
            <h1>Wait..</h1>
        )
    }

    return (
        <Router>
            <div>
                
            <Switch>
                <PublicRoute
                path="/auth"
                component={AuthRouter}
                isAutenticated={isLoggedIn}
                ></PublicRoute>
                
                <PrivateRoute
                exact
                path="/"
                component={JournalScreen}
                isAutenticated={isLoggedIn}
                ></PrivateRoute>

                <Redirect to="/auth/login" />

            </Switch>
            </div>
        </Router>
    )
}
