import * as React from "react";
import styles from './style'
import {Paper, withStyles, Typography} from "@material-ui/core";
import {connect} from "dva";
import BaseProps from "../../base/props";
import RegisterForm from "./components/RegisterForm";

interface RegisterPageProps extends BaseProps {
    dispatch: any
}

const RegisterPage = (props: RegisterPageProps) => {
    const {classes, dispatch} = props;
    const handleSummit = (username, password, email, rePassword) => {
        if (password !== rePassword) {
            dispatch({
                type: "error/sendError",
                message: "确认密码不一致"
            });
            return
        }
        dispatch({
            type: 'register/createUser',
            payload: {
                username, password, email
            },
        })
    };
    return (
        <div className={classes.container}>
            <Paper className={classes.registerCard}>
                <div>
                    <Typography variant={"h5"}>
                        注册用户
                    </Typography>
                    <div style={{marginTop: 32}}>
                        <RegisterForm
                            onLoginSubmit={handleSummit}
                        />
                    </div>
                </div>
            </Paper>
        </div>
    );
};

export default connect(({register}) => ({...register}))(withStyles(styles)(RegisterPage));
