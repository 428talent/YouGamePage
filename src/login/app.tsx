import * as React from "react";
import {AppBar, createMuiTheme, MuiThemeProvider, Toolbar, Typography} from "@material-ui/core";
import {green, purple} from "@material-ui/core/colors";
import MainNavBar from "../layout/navbar";
import {Router, Route} from 'dva/router';
import LoginCard from "./components/login-card";
import {connect} from "dva";
import theme from "../config/theme";
import Page from "../layout/page";


interface AppProps {
    dispatch: any
}

function App(props: AppProps) {
    function onLogin(username: string, password: string): void {
        props.dispatch({
            type: "app/userLogin",
            payload: {
                username, password
            }
        })
    }

    console.log(props);

    return (
        <div>
            <Page children={
                <LoginCard onLoginHandler={onLogin}/>
            }/>
        </div>
    )
}

export default connect(({}) => ({}))(App)
