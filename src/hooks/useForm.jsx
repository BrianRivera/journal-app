import React, { useState } from 'react'

export const useForm = (initialState = {}) => {

    const [values, setValue] = useState(initialState)

    const reset = (newFormState = initialState) => {
        setValue(newFormState);
    }


    const handleInputChange = ({ target }) => {
        setValue({
            ...values,
            [target.name]: target.value
        })
    }

    return [values, handleInputChange, reset];
}