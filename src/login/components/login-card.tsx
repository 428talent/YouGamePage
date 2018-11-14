import {Button, Card, TextField, Typography} from "@material-ui/core";
import * as React from "react";
import UserLoginForm from "./login-form";
import {ReactPropTypes} from "react";

interface LoginCardProps {
    onLoginHandler(username: string, password: string): void
}

const LoginCard = (props: LoginCardProps) => {
    const style = {
        container: {
            height: 300,
            width: 400,
            marginTop: 120,
            paddingTop: 10,
            paddingBottom: 10,
            paddingLeft: 10,
            paddingRight: 10,
            textAlign: "center" as "center"
        },
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
    const sb = values => {
        // print the form values to the console
        const username = values.target[0].value;
        const password = values.target[1].value;
        console.log(`login username = ${username}   |   password = ${password}`)
        props.onLoginHandler(username, password)
    };
    return (
        <div style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
        }}>
            <Card style={style.container}>
                <Typography variant="h6" gutterBottom>
                    登陆YouGame
                    <UserLoginForm onLoginSubmit={sb}/>
                </Typography>
            </Card>
        </div>
    )

};

export default LoginCard
