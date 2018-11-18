import * as React from "react";
import {createRef} from "react";
import {
    Avatar,
    Button,
    createStyles,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle, Divider,
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
import BaseProps from "../../../base/props";
import {ServerUrl} from "../../../config/api";


class UserSection extends React.Component<UserSectionProps, UserSectionState> {
    uploadAvatar: any;
    state: Readonly<UserSectionState> = {
        changeNicknameDialogOpen: false
    };


    constructor(props: Readonly<UserSectionProps>) {
        super(props);
        this.uploadAvatar = createRef();
        this.onUploadAvatar = this.onUploadAvatar.bind(this);
    }

    onUploadAvatar() {
        this.uploadAvatar.current.click()
    }


    render(): React.ReactNode {
        const {classes} = this.props;
        return (
            <div>
                <Grid container>
                    <Grid item xs={12}>
                        <Typography variant="h5">
                            账户设置
                        </Typography>
                    </Grid>
                    <Grid item xs={12} className={classes.settingSection}>
                        <Paper>
                            <List>
                                <ListItem onClick={this.onUploadAvatar} button>
                                    <ListItemIcon>
                                        <Avatar
                                            alt="Adelle Charles"
                                            src={function (user: UserModel.User) {
                                                if (user != null) {
                                                    return `${ServerUrl}/${user.profile.avatar}`
                                                } else {
                                                    return "http://localhost:8888/static/upload/user/avatar/a228b09a7ca497d3a0c169272ab4c9ab.jpg"
                                                }
                                            }(this.props.user)}
                                        />
                                    </ListItemIcon>
                                    <ListItemText primary="头像">

                                    </ListItemText>
                                    <input
                                        ref={this.uploadAvatar}
                                        type='file'
                                        style={{display: 'none'}}
                                        onChange={(e) => this.props.onUploadAvatar(e.target.files[0])}
                                    />
                                </ListItem>
                                <Divider/>
                                <ListItem button onClick={() => this.props.showChangeNicknameDialog(true)}>
                                    <ListItemText primary={
                                        function (user: UserModel.User) {
                                            if (user != null) {
                                                return user.profile.nickname
                                            } else {
                                                return "Unknown"
                                            }
                                        }(this.props.user)
                                    } secondary="昵称"/>
                                </ListItem>
                            </List>
                        </Paper>
                    </Grid>
                </Grid>
                <Dialog
                    open={this.props.isChangeNicknameDialogShow}
                    onClose={() => this.props.showChangeNicknameDialog(false)}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">变更昵称</DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="新昵称"
                            type="text"
                            fullWidth
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => this.props.showChangeNicknameDialog(false)} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={() => this.props.showChangeNicknameDialog(false)} color="primary">
                            Subscribe
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}

export interface UserSectionProps extends BaseProps {
    user?: UserModel.User
    isChangeNicknameDialogShow?: boolean

    onUploadAvatar(avatar): void

    showChangeNicknameDialog(isShow: boolean): void
}

interface UserSectionState {
    changeNicknameDialogOpen: boolean
}

const styles = theme => createStyles({
    settingSection: {
        marginTop: 16
    }
});
export default withStyles(styles)(UserSection)
