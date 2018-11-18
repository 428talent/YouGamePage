import * as React from "react";
import {reducer as formReducer} from 'redux-form'

export const dva = {
    config: {
        onError(e) {
            e.preventDefault();
            console.error(e.message);
        },
        extraReducers: {
            form: formReducer,
        },

    },
    plugins: [
        require('dva-logger')(),
    ],
    extraReducers: {
        form: formReducer
    }
};
