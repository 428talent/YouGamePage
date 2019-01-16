import * as React from "react";
import {createRef} from "react";
import {Field, reduxForm} from 'redux-form'
import {
    Avatar,
    createStyles,
    Divider,
    Grid,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Paper,
    TextField,
    Typography,
    withStyles
} from '@material-ui/core'
import BaseProps from "../../../../base/props"
import PasswordIcon from "@material-ui/icons/Fingerprint"
import {ServerUrl} from "../../../../config/api"
import ChangePasswordDialog from "../ChangePasswordDialog";
import {connect} from "dva";


class SecuritySection extends React.Component<SecuritySectionProps, {}> {

    render(): React.ReactNode {
        const {classes, changePasswordDialogActive, dispatch} = this.props;
        return (
            <div style={{marginTop: 24}}>
                <Grid container>
                    <Grid item xs={12}>
                        <Typography variant="h5">
                            安全设置
                        </Typography>
                    </Grid>
                    <Grid item xs={12} className={classes.settingSection}>
                        <Paper>
                            <List>
                                <ListItem button onClick={() => dispatch({
                                    type: "settingSecurity/setState",
                                    payload: {changePasswordDialogActive: true}
                                })}>
                                    <ListItemIcon>
                                        <PasswordIcon/>
                                    </ListItemIcon>
                                    <ListItemText primary="更改密码"/>
                                </ListItem>
                            </List>
                        </Paper>
                    </Grid>
                </Grid>
                <ChangePasswordDialog
                    isShow={changePasswordDialogActive}
                    onClose={() => dispatch({
                        type: "settingSecurity/setState",
                        payload: {changePasswordDialogActive: false}
                    })}
                    onComplete={(code, password) => dispatch({
                        type: "settingSecurity/resetPassword",
                        payload: {code, password}
                    })}
                    onSendVerifyCode={() => this.props.sendResetPasswordEmail()}
                />
            </div>
        )
    }
}

export interface SecuritySectionProps extends BaseProps {
    sendResetPasswordEmail: () => void
    changePasswordDialogActive: boolean
    dispatch: any
}


const styles = theme => createStyles({
    settingSection: {
        marginTop: 16
    }
});
export default connect(({settingSecurity}) => ({...settingSecurity}))(withStyles(styles)(SecuritySection))
