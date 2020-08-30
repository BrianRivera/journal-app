import React from 'react'
import { Slidebar } from './Slidebar'
import { NothingSelected } from './NothingSelected'
import { NotesScreen } from '../notes/NotesScreen'
import { useSelector } from 'react-redux'

export const JournalScreen = () => {

    const {active} = useSelector( state => state.notes );

    return (
        <div className="journal__main-content animate__animated animate__fadeIn animate__faster">
            <Slidebar></Slidebar>


            <main>

                {
                    (active)?
                    (<NotesScreen></NotesScreen>):
                    (<NothingSelected></NothingSelected>)
                }
                
            </main>
        </div>
    )
}
