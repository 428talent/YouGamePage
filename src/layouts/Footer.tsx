import * as React from 'react'
import {withStyles} from "@material-ui/core";
import BaseProps from "../base/props";

class Footer extends React.Component<FooterProps, {}> {

    constructor(props: Readonly<FooterProps>) {
        super(props);
    }

    render(): React.ReactNode {
        const {classes} = this.props;
        return (
            <div className={classes.root}>
                YouGame
            </div>
        )
    }
}

interface FooterProps extends BaseProps {

}

const styles = theme => ({
    root: {
        textAlign: "center" as "center",
        height: 100,
        marginTop: 60,
        backgroundColor: "#FFFFFF"

    }
});
export default withStyles(styles)(Footer)
