import './css/login.css'
import * as React from "react";

import LoginCard from "./components/login-card";
import {createStyles, withStyles} from "@material-ui/core";
import BaseProps from "../../base/props";
import {connect} from "dva";
import {url} from "inspector";


class Login extends React.Component<LoginProps, {}> {
    render(): React.ReactNode {
        const {dispatch,classes} = this.props;
        return (
            <div className={classes.container}>
                <LoginCard
                    onLoginHandler={(username, password) => {
                        this.props.dispatch({
                            type: "login/login",
                            payload: {username, password}
                        })
                    }}
                    onRegister={() => dispatch({
                        type:"error/sendError",
                        message:"test message"
                    })}
                />
            </div>
        )
    }
}

const styles = createStyles({
    container: {
        display: "flex",
        minHeight: 845,
        justifyContent: "center",
        alignItems: "center",
        backgroundImage: `url("/public/login_bg.jpg")`,
        backgroundSize: "cover"
    }
});

interface LoginProps extends BaseProps {
    dispatch: Function
}

export default connect(({login}) => ({...login}))(withStyles(styles)(Login))
