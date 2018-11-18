import './css/login.css'
import * as React from "react";
import Cookies from 'js-cookie'

import LoginCard from "./components/login-card";
import {createStyles, withStyles} from "@material-ui/core";
import BaseProps from "../../base/props";
import {UserLogin} from "../../services/user";
import {connect} from "dva";


class Login extends React.Component<LoginProps, {}> {
    render(): React.ReactNode {
        return (
            <div className={this.props.classes.container}>
                <LoginCard onLoginHandler={(username, password) => {
                    this.props.dispatch({
                        type: "login/login",
                        payload: {username, password}
                    })
                }}/>
            </div>
        )
    }
}

const styles = createStyles({
    container: {
        minHeight: 812
    }
});

interface LoginProps extends BaseProps {
    dispatch: Function
}

export default connect(({login}) => ({...login}))(withStyles(styles)(Login))
