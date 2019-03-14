import * as React from 'react'
import {Button, createStyles, TextField, withStyles} from "@material-ui/core";
import {Form, Field} from 'react-final-form'
import BaseProps from "../../../../base/props";
import {composeValidators, maxLength, minLength, required} from "../../../../utils/validators";


interface RegisterProps extends BaseProps {
    onLoginSubmit(username: string, password: string, email: string,rePassword : String)
}

class RegisterForm extends React.Component<RegisterProps, {}> {
    onSubmit = values => {
        this.props.onLoginSubmit(values.username, values.password, values.email,values.rePassword)
    };


    render(): React.ReactNode {
        const {classes} = this.props;
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
                variant={"outlined"}
            />
        );
        return (
            <Form onSubmit={this.onSubmit} render={({handleSubmit, pristine, invalid}) => (
                <form onSubmit={handleSubmit}>
                    <div>
                        <Field validate={composeValidators(required, minLength(4), maxLength(16))} label="用户名"
                               name="username" type="text" className={classes.inputField}
                               component={TextInput}/>
                    </div>
                    <div>
                        <Field validate={composeValidators(required, minLength(4), maxLength(32))} label="邮箱"
                               name="email" type="text" className={classes.inputField}
                               component={TextInput}/>
                    </div>
                    <div>
                        <Field validate={composeValidators(required, minLength(4), maxLength(16))} label="密码"
                               name="password" type="password" className={classes.inputField}
                               component={TextInput}/>
                    </div>
                    <div>
                        <Field validate={composeValidators(required, minLength(4), maxLength(16))} label="确认密码"
                               name="repassword" type="password" className={classes.inputField}
                               component={TextInput}/>
                    </div>

                    <div className={classes.buttonGroup}>
                        <Button variant="contained" className={classes.button} color="primary" type="submit">
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
        marginTop: 24
    },
    buttonGroup: {
        marginTop: 26
    },
    button: {
        width: 300,
        marginTop: 8
    }
});
export default withStyles(styles)(RegisterForm)
