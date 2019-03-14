import {Card, createStyles, Typography, withStyles} from "@material-ui/core";
import * as React from "react";
import UserLoginForm from "./LoginForm";
import BaseProps from "../../../base/props";

interface LoginCardProps extends BaseProps {
    onLoginHandler(username: string, password: string): void
    onRegister:() => void
}

class LoginCard extends React.Component<LoginCardProps> {

    loginHandler = (username: string, password: string) => {
        this.props.onLoginHandler(username, password)
    };

    render(): React.ReactNode {
        const {classes,onRegister} = this.props;
        return (
            <div style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
            }}>
                <Card className={classes.container}>
                    <div style={{display:"flex",justifyContent:"center",alignItems: "center"}}>
                        <img src={"/public/logo.svg"} style={{height:200}} />
                        <div>
                            <Typography variant="h6" gutterBottom>
                                登陆YouGame
                            </Typography>
                            <UserLoginForm onLoginSubmit={this.loginHandler} onRegister={onRegister}/>
                        </div>
                    </div>


                </Card>
            </div>
        )
    }


}

const styles = createStyles({
    container: {
        minHeight: 300,
        width: 600,
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
});
export default withStyles(styles)(LoginCard)
