import * as React from 'react'
import {Button, createStyles, TextField, withStyles} from "@material-ui/core";
import {Form, Field} from 'react-final-form'
import BaseProps from "../../../base/props";
import {composeValidators, required, maxLength, minLength} from "../../../utils/validators";

interface LoginFormProps extends BaseProps {
    onLoginSubmit(username: string, password: string)
    onRegister:() => void
}

class LoginForm extends React.Component<LoginFormProps, {}> {
    onSubmit = values => {
        this.props.onLoginSubmit(values.username, values.password)
    };

    render(): React.ReactNode {
        const {classes,onRegister} = this.props;
        const TextInput = ({
                               input: {name, onChange, value, ...restInput},
                               meta,
                               ...rest
                           }) => (
            <TextField
                {...rest}
                name={name}
                helperText={meta.touched ? meta.error : undefined}
                error={meta.error && meta.touched}
                inputProps={restInput}
                onChange={onChange}
                value={value}
            />
        );
        return (
            <Form onSubmit={this.onSubmit} render={({handleSubmit, pristine, invalid}) => (
                <form onSubmit={handleSubmit}>
                    <div>
                        <Field label="用户名" name="username" type="text" className={classes.inputField} component={TextInput}
                               validate={composeValidators(required,maxLength(16),minLength(4))}/>
                    </div>
                    <div>
                        <Field label="密码" name="password" type="password" className={classes.inputField} component={TextInput}
                               validate={composeValidators(required,maxLength(16),minLength(4))}/>
                    </div>
                    <div className={classes.buttonGroup}>
                        <Button type="submit" variant="contained" className={classes.button} color="primary">
                            登陆
                        </Button>
                        <Button onClick={onRegister} variant="outlined" className={classes.button} color="primary">
                            注册
                        </Button>
                    </div>

                </form>
            )}>

            </Form>
        )
    }
}

const styles = createStyles({
    inputField: {
        width: 300,
        marginTop: 12
    },
    buttonGroup: {
        marginTop: 26
    },
    button: {
        width: 300,
        marginTop: 8
    }
});
export default withStyles(styles)(LoginForm)
