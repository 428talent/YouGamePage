import * as React from "react";
import {createRef} from "react";
import {createStyles, Grid, withStyles} from '@material-ui/core'
import BaseProps from "../base/props";
import {FetchUser} from "../services/user";
import UserSection from "./components/UserSection";

class Setting extends React.Component<SettingProps, SettingState> {
    uploadAvatar: any;
    avatarInput: any;

    state: Readonly<SettingState> = {
        user: null,
        changeNicknameDialogOpen: false
    };

    componentDidMount(): void {
        FetchUser(3).then(response => this.setState({user: response.data}))
    }


    constructor(props: Readonly<SettingProps>) {
        super(props);
        this.uploadAvatar = createRef();
        this.onUploadAvatar = this.onUploadAvatar.bind(this);
    }

    onUploadAvatar() {
        console.log(this.uploadAvatar);
        this.uploadAvatar.current.click()
    }

    switchInputNicknameDialog = () => {
        this.setState(state => ({
            ...state,
            changeNicknameDialogOpen: !state.changeNicknameDialogOpen
        }))
    };

    render(): React.ReactNode {
        const {classes} = this.props;
        return (
            <div>
                <div className={classes.container}>
                    <Grid container>
                        <Grid item xs={12}>
                            <UserSection user={this.state.user}/>
                        </Grid>
                    </Grid>
                </div>
            </div>
        )
    }
}

interface SettingProps extends BaseProps {

}

interface SettingState {
    user: UserModel.User
    changeNicknameDialogOpen: boolean
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
export default withStyles(styles)(Setting)
