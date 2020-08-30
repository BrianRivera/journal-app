import React, { useRef,useEffect } from 'react'
import { NotesAppBar } from './NotesAppBar'
import { useSelector, useDispatch } from 'react-redux'
import { useForm } from '../../hooks/useForm';
import { activeNote, startDeleting } from '../../actions/notes';

export const NotesScreen = () => {

    const dispatch = useDispatch();
    const {active: note} = useSelector( state => state.notes );
    const [values,handleInputChange,reset] = useForm(note);
    const {body,title,id} = values;

    const activeId = useRef(note.id)

    useEffect(() => {
        
        if (note.id !== activeId.current) {
            reset(note);
            activeId.current = note.id;
        }
        return () => {}
    }, [note,reset]);


    useEffect(() => {
        dispatch(activeNote(values.id,{...values}));
        return () => {}
    }, [values,dispatch])

    const handleDelete = () => {
        dispatch(startDeleting(id));
    }

    return (
        <div className="notes__main-content">
            <NotesAppBar></NotesAppBar>

            <div className="notes__content">
                <input type="text"
                placeholder="Some awesome title"
                className="notes__title-input"
                autoComplete="off"
                value={title}
                name='title'
                onChange={handleInputChange}
                />
                <textarea name=""
                placeholder="What happened today"
                className="notes__textarea"
                value={body}
                name='body'
                onChange={handleInputChange}
                ></textarea>

                {
                    (note.url) &&
                <div className="notes__image">
                    <img src={note.url} alt="image"/>
                </div>
                }

            </div>

            <button 
            className="btn btn-danger"
            onClick={handleDelete}
            >Delete</button>
        </div>
    )
}
