import './css/login.css'
import * as React from "react";
import Cookies from 'js-cookie'

import Page from "../layout/page";
import LoginCard from "./components/login-card";
import BaseProps from "../base/props";
import {createStyles, withStyles} from "@material-ui/core";
import {UserLogin} from "../services/user";

// 创建应用


interface AppProps extends BaseProps {

}

class Login extends React.Component<AppProps, {}> {
    onLogin = (username: string, password: string) => {
        console.log(username)
        UserLogin(username, password).then(response => {
            console.log(response.data);
            Cookies.set('yougame_token', response.data.payload.Sign, {expires: 15});

        })
    };

    render(): React.ReactNode {
        return (

            <Page children={
                <div className={this.props.classes.container}>
                    <LoginCard onLoginHandler={this.onLogin}/>
                </div>
            }/>

        )
    }


}

const styles = createStyles({
    container: {
        minHeight: 812
    }
});
export default withStyles(styles)(Login)
