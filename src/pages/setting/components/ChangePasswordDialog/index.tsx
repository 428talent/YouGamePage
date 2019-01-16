import * as React from "react";
import {useState, Component, useEffect} from "react";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    Typography,
    DialogContentText,
    DialogTitle, Step, StepLabel, Stepper,
    TextField
} from "@material-ui/core";



class SendButton extends React.Component<{
    onSendButtonClick: () => void

}, {
    canSend: boolean
    count: number
}> {
    state = {
        count: 60,
        canSend: true
    };


    handleClick = () => {
        this.props.onSendButtonClick();
        let {canSend, count} = this.state;
        if (!canSend) {
            return
        }
        this.setState({canSend: false});
        const timer = setInterval(() => {
            this.setState({count: (count--)}, () => {
                if (count === 0) {
                    clearInterval(timer);
                    this.setState({canSend: true, count: 60})
                }
            });
        }, 1000);
    };

    render() {
        const {canSend, count} = this.state;
        return (<Button
            fullWidth
            onClick={this.handleClick}
            disabled={!canSend}

        > {
            canSend ? "获取验证码" : `${count}s`}
        </Button>)
    }


}

interface ChangePasswordDialogProps {
    onComplete: (code, password) => void
    isShow: boolean
    onClose: () => void
    onSendVerifyCode:() => void
}
const ChangePasswordDialog = (props: ChangePasswordDialogProps) => {
    const [activeStep, setActiveStep] = useState(0);
    const [code, setCode] = useState("");
    const [password, setPassword] = useState("");
    const steeperLabel = ['验证账户', '修改密码'];


    const steeper = (
        <Stepper activeStep={activeStep}>
            {steeperLabel.map((label, index) => {
                const stepProps = {};
                const labelProps = {};
                return (
                    <Step key={label} {...stepProps}>
                        <StepLabel {...labelProps}>{label}</StepLabel>
                    </Step>
                );
            })}
        </Stepper>
    );
    const renderStepView = () => {
        switch (activeStep) {
            case 0:
                return (
                    <div style={{display: "flex", justifyContent: "center"}}>
                        <div style={{}}>
                            <Typography variant={"body1"} style={{marginBottom: 16}}>
                                重置密码需要验证您的身份，请在账号绑定邮箱中获取验证码邮件。
                            </Typography>
                            <TextField
                                autoFocus
                                margin="dense"
                                variant={"outlined"}
                                id="name"
                                fullWidth
                                label="验证码"
                                onChange={(e) => setCode(e.target.value)}
                                type="text"

                                value={code}
                            />
                            <SendButton onSendButtonClick={() => props.onSendVerifyCode()}/>
                        </div>
                    </div>

                );
            case 1:
                return (
                    <div style={{}}>
                        <Typography variant={"body1"} style={{marginBottom: 16}}>
                            输入新密码
                        </Typography>
                        <div>

                            <TextField
                                autoFocus
                                margin="dense"
                                id="password"
                                label="密码"
                                variant={"outlined"}
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                fullWidth
                            />
                        </div>
                        <div>
                            <TextField
                                margin="dense"
                                id="name"
                                variant={"outlined"}
                                label="确认密码"
                                type="password"
                                fullWidth
                            />
                        </div>
                    </div>
                )
        }
    };
    return (
        <Dialog open={props.isShow} aria-labelledby="form-dialog-title" maxWidth={"lg"}>
            <DialogTitle id="form-dialog-title">重设密码</DialogTitle>
            <DialogContent style={{width: 320, height: 220}}>
                <DialogContentText>

                </DialogContentText>
                <div style={{marginTop: 12, marginBottom: 12}}>
                    {renderStepView()}
                </div>
            </DialogContent>
            <DialogActions>
                <Button color="primary" onClick={(e) => props.onClose()}>
                    取消
                </Button>
                <Button color="primary"
                        onClick={() => setActiveStep(activeStep - 1)}
                        disabled={activeStep == 0}
                >
                    上一步
                </Button>
                {
                    activeStep == steeperLabel.length - 1 ?
                        <Button color="primary" onClick={() => props.onComplete(code, password)}>
                            确认
                        </Button>
                        :
                        <Button color="primary" onClick={() => setActiveStep(activeStep + 1)}>
                            下一步
                        </Button>
                }

            </DialogActions>
        </Dialog>
    );
};

export default ChangePasswordDialog;

