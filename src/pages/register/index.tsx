import * as React from "react";
import styles from './style'
import {Paper, withStyles, Typography} from "@material-ui/core";
import {connect} from "dva";
import BaseProps from "../../base/props";
import RegisterForm from "./components/RegisterForm";

interface RegisterPageProps extends BaseProps {

}

const RegisterPage = (props: RegisterPageProps) => {
    const {classes} = props;
    return (
        <div className={classes.container}>
            <Paper className={classes.registerCard}>
                <div>
                    <Typography variant={"h5"}>
                        注册用户
                    </Typography>
                    <div style={{marginTop:32}}>
                    <RegisterForm onLoginSubmit={(username,password) => console.log({username,password})}/>
                    </div>
                </div>
            </Paper>
        </div>
    );
};

export default connect(({register}) => ({...register}))(withStyles(styles)(RegisterPage));