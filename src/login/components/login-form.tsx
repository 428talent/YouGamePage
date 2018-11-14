import {Component} from 'react'
import {Field, reduxForm} from 'redux-form'
import * as React from "react";
import {Button, TextField} from "@material-ui/core";

const styles = {
    inputField: {
        width: 300
    },
    buttonGroup: {
        marginTop: 26
    },
    button: {
        width: 300,
        marginTop: 8
    }
};
const LoginForm = ({onLoginSubmit}) => {
    return (
        <form onSubmit={onLoginSubmit}>
            <div>
                <Field name="username" component={() => {
                    return (
                        <TextField
                            style={styles.inputField}
                            label="用户名"
                            margin="normal"
                        />
                    )
                }}/>
            </div>
            <div>
                <Field name="password" component={() => {
                    return (
                        <TextField
                            style={styles.inputField}
                            label="密码"
                            margin="normal"
                        />
                    )
                }}/>

            </div>
            <div style={styles.buttonGroup}>
                <Button type="submit" variant="contained" style={styles.button} color="primary">
                    登陆
                </Button>
                <Button variant="outlined" style={styles.button} color="primary">
                    注册
                </Button>
            </div>

        </form>
    )

};
const UserLoginForm = reduxForm({
    // a unique name for the form
    form: 'login'
})(LoginForm);
export default UserLoginForm
