import * as React from 'react'
import {Button, createStyles, TextField, withStyles} from "@material-ui/core";
import {Form, Field} from 'react-final-form'
import BaseProps from "../../../../base/props";


interface RegisterProps extends BaseProps {
    onLoginSubmit(username: string, password: string)
}
const required = value => (value ? undefined : "Required");

class RegisterForm extends React.Component<RegisterProps, {}> {
    onSubmit = values => {
        this.props.onLoginSubmit(values.username, values.password)
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
                        <Field validate={required} label="用户名" name="username" type="text" className={classes.inputField}
                               component={TextInput}/>
                    </div>
                    <div>
                        <Field label="密码" name="password" type="password" className={classes.inputField}
                               component={TextInput}/>
                    </div>
                    <div>
                        <Field label="确认密码" name="repassword" type="password" className={classes.inputField}
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
        marginTop: 80
    }
});
export default withStyles(styles)(RegisterForm)
