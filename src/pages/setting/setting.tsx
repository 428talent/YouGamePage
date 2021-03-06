import * as React from "react";
import {createRef} from "react";
import {createStyles, Grid, withStyles} from '@material-ui/core'
import BaseProps from "../../base/props";
import UserSection from "./components/UserSection";
import {connect} from "dva";
import SecuritySection from "./components/SecuritySection";

class Setting extends React.Component<SettingProps, {}> {
    showChangeNicknameDialog = (isShow: boolean) => {
        this.props.dispatch({
            type: "setting/changeNicknameDialogVisitable",
            payload: {
                isShow
            }
        })
    };
    uploadAvatar = (avatar) => {
        this.props.dispatch({
            type: "setting/uploadUserAvatar",
            payload: {
                avatar
            }
        })
    };
    changeNickname = (nickname: string) => {
        this.props.dispatch({
            type: "setting/changeNickname",
            payload: {
                nickname
            }
        })
    };

    render(): React.ReactNode {
        const {classes,dispatch} = this.props;
        return (
            <div>
                <div className={classes.container}>
                    <Grid container>
                        <Grid item xs={12}>
                            <UserSection {...this.props.userSection} user={this.props.user}
                                         onUploadAvatar={this.uploadAvatar}
                                         onChangeUserNickname={this.changeNickname}
                                         showChangeNicknameDialog={this.showChangeNicknameDialog}/>
                            <SecuritySection
                                sendResetPasswordEmail={() => dispatch({type:"setting/sendResetPasswordMail"})}
                            />
                        </Grid>
                    </Grid>
                </div>
            </div>
        )
    }
}

interface SettingProps extends BaseProps {
    user: null,
    userSection: any,
    dispatch: Function
}

const styles = theme => createStyles({
    container: {
        marginTop: 150,
        marginLeft: 400,
        marginRight: 400,
        minHeight: 1024
    },
    settingSection: {
        marginTop: 16
    }
});
export default connect(({app, setting}) => ({
    user: app.user,
    ...setting
}))(withStyles(styles)(Setting))
